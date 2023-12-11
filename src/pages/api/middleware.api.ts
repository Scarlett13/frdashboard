/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from 'cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import type { NextApiRequest, NextApiResponse } from 'next';

import logger from '@/lib/logger';

import { isValidApiMethod, isValidUrlPath } from '@/utils/url-utils';

import { getTokenOnly } from './access.api';

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (!req.method) {
      return res.status(403).json({ success: false, message: 'Forbidden.' });
    }

    if (
      req.method.toUpperCase() !== 'POST' &&
      req.method.toUpperCase() !== 'PUT'
    ) {
      return res.status(400).json({ success: false, message: 'Forbidden.' });
    }

    const token = getTokenOnly(req);

    const requestbody = await req.body;

    const { path, method, body } = requestbody;

    // if (!isValidUrlPath(path)) {
    //   return res.status(400).json({ success: false, message: 'Invalid Path.' });
    // }

    if (!isValidApiMethod(method)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Method.' });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (
      (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') &&
      !body
    ) {
      return new Response(JSON.stringify({ message: 'Invalid body.' }), {
        status: 400,
      });
    }

    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
      options.body = JSON.stringify(body);
    }

    const forwardedrequest = await fetch(
      `http://192.168.10.31:5000${path}`,
      options
    );
    // console.log(`${env.NEXT_PUBLIC_API_BASE_URL}/v1${path}`);

    const bodyreturn = await forwardedrequest.json();

    return res.status(200).json({
      success: true,
      body: bodyreturn,
    });
  } catch (error) {
    logger(error);
    return res.status(500).json({
      success: false,
      body: error,
    });
  }
}

// const cookies = cookie.parse(req.headers?.cookie ?? '');
//     const appCookie = cookies?.['uss_sess'] ?? '';
//     const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
//     const accessToken = parsedCookies?.accessToken ?? null;
//     logger(req.headers.cookie);

//     if (!accessToken) {
//       return res
//         .status(400)
//         .json({ success: false, message: 'No token present!' });
//     }

//     const { exp } = jwt_decode(accessToken) as JwtPayload;
//     if (!exp) {
//       res.setHeader(
//         'Set-Cookie',
//         cookie.serialize('uss_sess', '', {
//           httpOnly: true,
//           // secure: process.env.NODE_ENV !== "development",
//           // maxAge: expiresIn,
//           sameSite: 'strict',
//           path: '/',
//         })
//       );

//       return res.status(400).json({
//         success: false,
//         message: 'Malformed token!',
//       });
//     }
//     const isAccessTokenExpired = Date.now() / 1000 > exp;

//     // const refreshToken = parsedCookies?.refreshToken;

//     /**
//      * Fetch new access token if it expires
//      */
//     if (isAccessTokenExpired) {
//       res.setHeader(
//         'Set-Cookie',
//         cookie.serialize('uss_sess', '', {
//           httpOnly: true,
//           // secure: process.env.NODE_ENV !== "development",
//           // maxAge: expiresIn,
//           sameSite: 'strict',
//           path: '/',
//         })
//       );
//       res.status(400).json({ success: false, message: 'Session Expired!' });
//     }

//     if (!parsedCookies || !parsedCookies.accessToken) {
//       return res.status(400).json({
//         success: false,
//         message: 'No active session!',
//       });
//     }
