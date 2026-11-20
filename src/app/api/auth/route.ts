import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Default admin credentials for the local business owner (configurable in code/env)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'dubai2026';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const isUsernameValid = !username || username === ADMIN_USERNAME;
    const isPasswordValid = password === ADMIN_PASSWORD;

    if (isUsernameValid && isPasswordValid) {
      const cookieStore = await cookies();
      cookieStore.set('apex_admin_session', 'authenticated_token_apex_2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return NextResponse.json({ success: true, message: 'Authenticated successfully' });
    }

    return NextResponse.json({ error: 'Invalid username or password. Please check your credentials.' }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Authentication error' }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('apex_admin_session');
  return NextResponse.json({ success: true, message: 'Logged out' });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get('apex_admin_session');
  const isAuthenticated = session?.value === 'authenticated_token_apex_2026';
  return NextResponse.json({ isAuthenticated });
}
