import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();
  const { email, password, name } = body;

  try {
    const res = await fetch('http://stepwise.rekkvps.online/api/collections/users/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm: password,
        name,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, user: data });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
