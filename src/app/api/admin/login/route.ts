import { NextResponse } from 'next/server';
import { generateAdminToken } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, remember } = await request.json();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Server is not configured for admin auth' }, { status: 500 });
    }

    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await generateAdminToken({ sub: 'admin', email, role: 'admin' }, remember ? '7d' : 'session');

    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      // session cookie if not remembered
      ...(remember ? { maxAge: 7 * 24 * 60 * 60 } : {}),
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}


