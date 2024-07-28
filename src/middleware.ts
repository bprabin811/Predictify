import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('token');

    const loggedInUserNotAccessPath = ['/', '/auth/login', '/auth/register'];
    const protectedPaths = [
        '/profile',
        '/workspace',
        '/workspace/analytics',
        '/workspace/view',
        '/settings',
        '/settings/account',
        '/settings/apikeys',
        '/settings/appearance',
        '/settings/notifications',
        '/settings/plans',
        '/feedbacks',
        '/feedbacks/status',
        '/feedbacks/request',
    ];

    const pathname = request.nextUrl.pathname.toLowerCase();

    // Redirect logged-in users away from public paths
    if (loggedInUserNotAccessPath.includes(pathname) && accessToken) {
        return NextResponse.redirect(new URL('/workspace', request.url));
    }


    // Redirect non-logged-in users away from protected paths
    if (protectedPaths.some(path => pathname.startsWith(path)) && !accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

// Matcher configuration
export const config = {
    matcher: [
        '/',
        '/auth/login',
        '/auth/register',
        '/profile',
        '/workspace',
        '/workspace/analytics',
        '/workspace/view',
        '/settings',
        '/settings/account',
        '/settings/apikeys',
        '/settings/appearance',
        '/settings/notifications',
        '/settings/plans',
        '/feedbacks',
        '/feedbacks/status',
        '/feedbacks/request',
        '/((?!_next/static|favicon.ico).*)',
    ],
};
