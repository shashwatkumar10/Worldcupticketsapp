import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes except /admin/login
    const isLoginPath = pathname === '/admin/login' || pathname === '/admin/login/';

    if (pathname.startsWith('/admin') && !isLoginPath) {
        const adminToken = request.cookies.get('admin_session');

        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
