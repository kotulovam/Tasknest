// lib/auth.js
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("pb_auth");

  if (!session) return null;

  try {
    const { user } = JSON.parse(session.value);
    return user || null;
  } catch {
    return null;
  }
}
