import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get('pb_auth');

  if (!cookie) {
    return NextResponse.json({ user: null });
  }

  try {
    const { user } = JSON.parse(cookie.value);
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}
