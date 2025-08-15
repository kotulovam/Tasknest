"use client";

import React, { useState } from "react";


const AddItemModal = ({ showModal, setShowModal }) => {
  const [name, setName] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/todos", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
    setName("")
    setShowModal(false)
  }

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-5">
        <div className="bg-[#1e293b] rounded-2xl shadow-lg w-full max-w-md px-8 py-6 relative animate-fadeIn">
          <div className="text-xl font-bold text-white text-left mb-4">New Task</div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Task name"
              className="w-full rounded-lg bg-[#0f172a] text-white px-4 py-2 border border-gray-600 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />

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

export default AddItemModal
