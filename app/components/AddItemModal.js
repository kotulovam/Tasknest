"use client";

import React, { useState } from "react";
import { Star } from "lucide-react"

export default function AddItemModal({ setShowModal, itemName, collection }) {
  const [name, setName] = useState("")
  const [habitTime, setHabitTime] = useState("")
  const [isPriority, setIsPriority] = useState(false)

  const handleSubmit = async (e) => {
    await fetch(`/api/${collection}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isPriority, name, habitTime })
    })
    setName("")
    setShowModal(false)
  }

  const handleTimeSelect = (e) => {
    setHabitTime(e.target.value)
  }

  const handlePrioritize = (e) => {
    e.preventDefault();
    setIsPriority(isPriority => !isPriority);
  }

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center px-5 backdrop-blur">
      <div className="relative w-full max-w-md px-8 py-6 sm:px-8 sm:py-6 bg-[#1e293b] rounded-2xl shadow-lg">
        <div className="text-xl text-white text-left font-bold mb-4">New {itemName}</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`${itemName} name`}
              className="w-full bg-[#0f172a] text-white text-md px-4 py-2 pr-10 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
            {collection === "todos" && (
              <button
                type="button"
                onClick={(e) => handlePrioritize(e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-1 py-1"
              >
                {isPriority ? (
                  <Star size={20} color="#FFD300" fill="#FFD300" />
                ) : (
                  <Star size={20} color="#D3D3D333" fill="#334155" />
                )}
              </button>
            )}
          </div>

          {collection === "habits" && (
            <div className="relative">
              <select
                value={habitTime}
                onChange={(e) => handleTimeSelect(e)}
                className={`w-full appearance-none rounded-lg bg-[#0f172a] px-4 py-2 border border-slate-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${habitTime === "" ? "text-gray-400" : "text-white"
                  }`}

              >
                <option value="" disabled hidden>{`${itemName} schedule`}</option>
                <option value="morning">Morning</option>
                <option value="day">Day</option>
                <option value="evening">Evening</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          )}

          <div className="flex sm:justify-end py-2 text-sm">
            <button
              type="submit"
              className="flex flex-1 sm:max-w-[40%] justify-center items-center gap-2 px-4 py-2 font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-lg border border-purple-700 transition-colors">
              Add
            </button>
          </div>
        </form>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors">
          ✕
        </button>

      </div >
    </div >


  )
}
