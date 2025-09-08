"use client";

import SignIn from "@/app/components/auth/SignIn"
import React from "react"

export default function LogIn() {

  return (
    <div className="mt-8">
      <SignIn />
      <div className="flex flex-row gap-3 justify-center mt-8">
        <p className="text-gray-400">
          Do not have an account?
        </p>
        <a
          href="/sign-up"
          className="text-purple-400 hover:text-purple-300 hover:underline transition"
        >
          Sign Up
        </a>
      </div>
    </div>
  )
}

