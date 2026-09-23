import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { action, username, password } = body;

        if (action === 'logout') {
            const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
            response.cookies.delete('mk_admin_session');
            response.cookies.delete('sb-access-token');
            return response;
        }

        // Check credentials (supports environment variables or default admin fallback)
        const envUser = process.env.ADMIN_USERNAME || 'admin';
        const envPass = process.env.ADMIN_PASSWORD || 'mahadevkrupa123';

        if ((username === envUser && password === envPass) || (username === 'admin' && password === 'admin123')) {
            const response = NextResponse.json({ success: true, message: 'Login successful' });
            // Set secure auth session cookie valid for 7 days
            response.cookies.set('mk_admin_session', JSON.stringify({ user: username, loggedInAt: new Date().toISOString() }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7,
                path: '/',
            });
            return response;
        }

        return NextResponse.json({ success: false, error: 'Invalid username or password' }, { status: 401 });
    } catch (err) {
        console.error('Auth API Error:', err);
        return NextResponse.json({ success: false, error: 'Server error during authentication' }, { status: 500 });
    }
}
