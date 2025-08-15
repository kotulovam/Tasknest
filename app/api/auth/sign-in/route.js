import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req) {

  const cookieStore = await cookies();
  const session = cookieStore.get('pb_auth');
  const { email, password } = await req.json();

  try {
    const res = await fetch('http://stepwise.rekkvps.online/api/collections/users/auth-with-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identity: email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    cookieStore.set('pb_auth', JSON.stringify({
      token: data.token,
      user: data.record,
    }), {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ success: true, user: data.record });
  } catch (err) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
