import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import authAdmin from '@/lib/firebase-admin';
import { verifySession } from './lib/authGuard';
import { getAuth } from "firebase-admin/auth";

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

export async function protectRoute(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get('origin');

  // 1. Handle CORS (Cross-Origin Resource Sharing)
  // Check if the origin is allowed
  if (origin && !allowedOrigins.includes(origin) && process.env.NODE_ENV === 'production') {
    return new NextResponse(null, { status: 400, statusText: 'Bad Request: Origin Not Allowed' });
  }

  // Handle Preflight OPTIONS requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  // 2. Authentication Logic
  const token = request.cookies.get('session')?.value;

  // Check against the actual paths defined in your matcher
  if (pathname.startsWith('/user') || pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    try {
      const auth = getAuth();
      const decodedToken = await auth.verifyIdToken(token || '');
      if (!decodedToken) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }

      if( pathname.startsWith('/admin')) {
        if(decodedToken.email !== process.env.ADMIN_EMAIL) {
          return new NextResponse('Forbidden', { status: 403 });
        }
      }
    } catch (error) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

  }

  // 3. Append CORS headers to the response of successful requests
  const response = NextResponse.next();
  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  return response;
}

export function proxy(request: NextRequest) {
  return protectRoute(request);
}

// 4. Matcher Configuration
// Ensure these match the logic inside your middleware function
export const config = {
  matcher: [
    '/user/:path*', 
    '/admin/:path*',
    '/api/:path*', 
  ],
};