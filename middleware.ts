import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /admin routes, excluding /admin/login and static/api assets
    if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
        const adminSession = request.cookies.get('mk_admin_session');
        const supabaseToken = request.cookies.get('sb-access-token') || request.cookies.get('sb-auth-token');

        const isAuthenticated = Boolean(adminSession?.value || supabaseToken?.value);

        if (!isAuthenticated) {
            const loginUrl = new URL('/admin/login', request.url);
            loginUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
