import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isLoginCookie = request.cookies.get('isLogin');
    const accessToken = isLoginCookie && isLoginCookie.value === 'true';

    const LoggedInUserNotAccessPath = ['/', '/auth/login', '/auth/register'];
    const isProtectedPath = ['/profile', '/workspace', '/workspace/analytics','/workspace/view','/((?!_next/static|favicon.ico).*)'];

    const pathname = request.nextUrl.pathname.toLowerCase(); 

    // Redirect logged-in users away from public paths
    if (LoggedInUserNotAccessPath.includes(pathname) && accessToken) {
        return NextResponse.redirect(new URL('/workspace', request.url));
    }

    // Redirect non-logged-in users away from protected paths
    if (isProtectedPath.includes(pathname) && !accessToken) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

// Matcher configuration
export const config = {
    matcher: ['/', '/auth/login', '/auth/register', '/profile', '/workspace', '/workspace/analytics','/workspace/view','/((?!_next/static|favicon.ico).*)'],
};
