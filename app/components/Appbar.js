"use client";

import { User } from "lucide-react";
import React, { useEffect, useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserActions from "./UserActions";

export default function AppBar() {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch("/api/auth/current-user")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user)
      })
  }, [])

  const handleLogOut = async () => {
    await fetch("/api/auth/log-out", {
      method: "POST"
    })
    setUser(null)
    window.location.href = "/log-in"
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="text-xl font-semibold text-slate-100">
          TaskNest
        </div>
        {user ? (
          <>
            <div className="flex flex-col mt-0.5 items-center justify-center text-xs">
              <User onClick={() => setShowModal(true)} size={24} />
              {user.name}</div>
            {showModal && (
              <UserActions
                user={user}
                handleLogOut={handleLogOut}
                showModal={showModal}
                setShowModal={setShowModal}
                setShowEditModal={setShowEditModal}
              />
            )}
          </>
        ) : (<Link href="/log-in"><User size={24} /></Link>)}
      </div>
    </header>
  );
}
