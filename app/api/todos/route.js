import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("pb_auth")
  const { token, user } = JSON.parse(session?.value || '{}');

  if (!token || !user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch(
      `http://stepwise.rekkvps.online/api/collections/todos/records?filter=user="${user.id}"&perPage=100`, {
      headers: {
        Authorization: token
      }
    })
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ todos: data.items || [] });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}


export async function POST(req) {
  const body = await req.json();
  const { name, isChecked = false } = body;

  const cookieStore = await cookies();
  const session = cookieStore.get("pb_auth")
  const { token, user } = JSON.parse(session?.value || '{}');

  if (!token || !user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const res = await fetch('http://stepwise.rekkvps.online/api/collections/todos/records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        name,
        isChecked,
        user: user.id,
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
