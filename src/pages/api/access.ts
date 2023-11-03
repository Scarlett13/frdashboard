import cookie from "cookie";
import jwt_decode, { JwtPayload } from "jwt-decode";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const cookies = cookie.parse(req.headers?.cookie ?? "");
  const appCookie = cookies?.["uss_sess"] ?? "";
  const parsedCookies = appCookie ? JSON.parse(appCookie) : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  console.log(appCookie);

  if (!accessToken) {
    res.status(400).json({ success: false, message: "No token present!" });
  }

  const { exp } = jwt_decode(accessToken) as JwtPayload;
  if (!exp) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("uss_sess", "", {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== "development",
        // maxAge: expiresIn,
        sameSite: "strict",
        path: "/",
      })
    );

    return res.status(400).json({
      success: false,
      message: "Malformed token!",
    });
  }
  const isAccessTokenExpired = Date.now() / 1000 > exp;

  // const refreshToken = parsedCookies?.refreshToken;

  /**
   * Fetch new access token if it expires
   */
  if (isAccessTokenExpired) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("uss_sess", "", {
        httpOnly: true,
        // secure: process.env.NODE_ENV !== "development",
        // maxAge: expiresIn,
        sameSite: "strict",
        path: "/",
      })
    );
    res.status(400).json({ success: false, message: "Session Expired!" });
  }

  if (!parsedCookies || !parsedCookies.accessToken) {
    return res.status(400).json({
      success: false,
      message: "No active session!",
    });
  }

  res.status(200).json({ success: true, token: parsedCookies.accessToken });
}