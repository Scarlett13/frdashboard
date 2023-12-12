import jwt_decode, { JwtPayload } from 'jwt-decode';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import logger from '@/lib/logger';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //getting accessToken from cookies 'use_sess' and try to parse the json, if the value of the cookies are valid, proceed
  const sessionCookies = request.cookies.get('uss_sess');
  const sessionCookiesValue = sessionCookies?.value ?? '';
  const parsedCookies = sessionCookiesValue
    ? JSON.parse(sessionCookiesValue)
    : {};
  const accessToken = parsedCookies?.accessToken ?? null;

  //getting pathname of the request (this pathname exclude matcher in config at the bottom of this file)
  const pathname = request.nextUrl.pathname;

  //if the accessToken is not valid, redirect to login. if the pathname already /login, skip
  if (!accessToken) {
    return pathname === '/login'
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  const { exp } = jwt_decode(accessToken) as JwtPayload;
  // logger(exp);

  if (!exp) {
    request.cookies.set('use-sess', '');

    return pathname === '/login'
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  const isAccessTokenExpired = Date.now() / 1000 > exp;

  if (isAccessTokenExpired) {
    request.cookies.set('use-sess', '');

    return pathname === '/login'
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  //TODO: add API logic here
  if (pathname.startsWith('/api')) {
    logger('masuk middleware pak ekooo');
    return NextResponse.next();
  }
  // logger(pathname);

  return pathname !== '/visitor'
    ? NextResponse.redirect(new URL('/visitor', request.url))
    : NextResponse.next();

  // return pathname === '/login' || pathname === '/'
  //   ? NextResponse.redirect(new URL('/visitor', request.url))
  //   : NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
