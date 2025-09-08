"use client";

import SignUp from "@/app/components/auth/SignUp"
import React from "react"

export default function LogIn() {

  return (
    <div className="">
      <SignUp />
      <div className="flex flex-row gap-3 justify-center mt-8">
        <p className="text-gray-400">
          Already have an account?
        </p>
        <a
          href="/log-in"
          className="text-purple-400 hover:text-purple-300 hover:underline transition"
        >
          Sign In
        </a>
      </div>
    </div>
  )
}

