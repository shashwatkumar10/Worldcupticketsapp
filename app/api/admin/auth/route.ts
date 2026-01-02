import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { password } = await request.json();

    // In a real app, this would check against an environment variable
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });

        // Set a simple cookie for authentication
        response.cookies.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
