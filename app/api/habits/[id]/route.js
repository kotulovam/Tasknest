import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function PATCH(req, { params }) {
  const { id } = params;
  const { isChecked, name, habitTime } = await req.json();

  const cookieStore = await cookies();
  const session = cookieStore.get("pb_auth")
  const { token, user } = JSON.parse(session?.value || '{}');

  if (!token || !user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = {}
  if (typeof isChecked !== "undefined") body.isChecked = isChecked
  if (typeof habitTime !== "undefined") body.habitTime = habitTime
  if (typeof name !== "undefined") body.name = name

  try {
    const res = await fetch(
      `${process.env.POCKETBASE_URL}/api/collections/habits/records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json({ habit: data });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
