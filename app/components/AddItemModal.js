"use client";

import React, { useState } from "react";

export default function AddItemModal({ setShowModal, itemName, collection }) {
  const [name, setName] = useState("")
  const [habitTime, setHabitTime] = useState("")

  const handleSubmit = async (e) => {
    await fetch(`/api/${collection}`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, habitTime })
    })
    setName("")
    setShowModal(false)
  }

  const handleTimeSelect = (e) => {
    setHabitTime(e.target.value)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-5">
        <div className="bg-[#1e293b] rounded-2xl shadow-lg w-full max-w-md px-8 py-6 relative animate-fadeIn">
          <div className="text-xl font-bold text-white text-left mb-4">New {itemName}</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`${itemName} name`}
              className="w-full rounded-lg bg-[#0f172a] text-white px-4 py-2 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />

            {collection === "habits" && (
              <div className="relative">
                <select
                  value={habitTime}
                  onChange={(e) => handleTimeSelect(e)}
                  className={`w-full appearance-none rounded-lg bg-[#0f172a] px-4 py-2 border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 ${habitTime === "" ? "text-gray-400" : "text-white"
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

            <div className="flex justify-between gap-8 py-2 ">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-[#0f172a] transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className=" flex-1 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-colors"
              >
                Add
              </button>
            </div>

          </form>

          <button
            onClick={() => setShowModal(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

    </>
  )
}
