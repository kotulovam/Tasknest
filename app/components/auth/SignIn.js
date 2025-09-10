'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Invalid login');
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl px-8 py-6 shadow-lg">
        <div className="text-2xl font-bold text-white text-center">Log In</div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#0f172a] text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              className="w-full rounded-lg bg-[#0f172a] text-white px-4 py-2 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold shadow-md transition-colors mt-2"
          >
            Sign In
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
