"use client";

import React, { useState } from "react";

export default function EditModal({ setShowEditModal, todo, itemName, collection }) {
  const [name, setName] = useState(todo?.name ?? "")
  // const [habitTime, setHabitTime] = useState("")
  const [isPriority, setIsPriority] = useState(!!todo?.isPriority)

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/${collection}/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, isPriority })
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Update failed:", err);
      }
    } catch (err) {
      console.error("Update error:", err);
    } finally {
      setShowEditModal(false);
      window.location.reload()
    }
  }

  const handleDelete = async (e) => {
    const ok = window.confirm("Are you sure you want to delete?")
    if (!ok) return;

    try {
      const res = await fetch(`/api/${collection}/${todo.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Delete failed:", err);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setShowEditModal(false);
      window.location.reload()
    }
  }

  const handlePrioritize = (e) => {
    e.preventDefault();
    setIsPriority(!isPriority);
  }

  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center px-5 backdrop-blur">
      <div className="relative w-full max-w-md px-8 py-6 sm:px-8 sm:py-6 bg-[#1e293b] rounded-2xl shadow-lg">
        <div className="text-xl text-white text-left font-bold mb-4">Edit {itemName}</div>

        <form onSubmit={handleEdit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={`${itemName} name`}
            className="w-full bg-[#0f172a] text-white text-md px-4 py-2 border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />

          {/* {collection === "habits" && (
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
          )} */}

          <div className="flex flex-row justify-between gap-4 sm:gap-8 py-2 text-sm">
            <button
              type="button"
              onClick={collection === "todos" ? (e) => handlePrioritize(e) : () => setShowEditModal(false)}
              className={`flex flex-1 justify-center items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-600 transition-colors ${isPriority && "bg-yellow-400 hover:bg-yellow-300 text-slate-800 font-semibold"}`}>
              {collection === "todos"
                ? (isPriority ? "Prioritized" : "Prioritize")
                : "Cancel"}
            </button>

            <button
              type="submit"
              className="flex flex-1 justify-center items-center gap-2 px-4 py-2 font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-lg border border-purple-700 transition colors">
              Save
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="flex flex-1 justify-center items-center gap-2 px-4 py-2 font-bold text-white bg-purple-700 hover:bg-purple-600 rounded-lg border border-purple-700 transition colors">
              Delete
            </button>

          </div>

        </form>

        <button
          onClick={() => setShowEditModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors">
          ✕
        </button>

      </div>
    </div>


  )
}
