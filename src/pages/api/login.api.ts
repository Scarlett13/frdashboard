// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  success: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { accessToken, refreshToken } = req.body;

  const cookieObj = {
    accessToken,
    refreshToken,
  };

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('uss_sess', JSON.stringify(cookieObj), {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== "development",
      // maxAge: expiresIn,
      sameSite: 'strict',
      path: '/',
    })
  );
  res.status(200).json({ success: cookieObj });
}
