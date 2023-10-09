// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

type Data = {
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
    "Set-Cookie",
    cookie.serialize("uss_sess", JSON.stringify(cookieObj), {
      httpOnly: true,
      // secure: process.env.NODE_ENV !== "development",
      // maxAge: expiresIn,
      sameSite: "strict",
      path: "/",
    })
  );
  res.status(200).json({ success: cookieObj });
}
