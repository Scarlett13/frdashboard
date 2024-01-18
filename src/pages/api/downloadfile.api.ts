/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cookie from 'cookie';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import stream from 'stream';
import { promisify } from 'util';

import logger from '@/lib/logger';

import { isValidApiMethod, isValidUrlPath } from '@/utils/url-utils';

import { getTokenOnly } from './access.api';

const pipeline = promisify(stream.pipeline);

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

    // logger(await forwardedrequest.blob());

    // const bodyreturn = await forwardedrequest.blob();

    if (!forwardedrequest.ok) {
      return res.status(200).json({
        success: false,
        body: 'false',
      });
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=dummy.pdf');
    await pipeline(forwardedrequest?.body ?? '', res);
  } catch (error) {
    logger(error);
    return res.status(500).json({
      success: false,
      body: error,
    });
  }
}
