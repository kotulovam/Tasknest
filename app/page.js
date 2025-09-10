"use client"

import React from "react"
import { useState, useEffect } from "react"
import { CirclePlus } from "lucide-react"
import AddItemModal from "@/app/components/AddItemModal"
import ToDo from "./todo-list/page"
import EditModal from "./components/EditModal"

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentTodo, setCurrentTodo] = useState(null)

  useEffect(() => {
    fetch("/api/auth/current-user")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          window.location.href = "/log-in";
        }
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        window.location.href = "/log-in";
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (!user) {
    return null;
  }

  const openEdit = (todo) => {
    setCurrentTodo(todo)
    setShowEditModal(true)
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="relative w-[95%]">
            <button
              onClick={() => setShowModal(true)}
              className="sticky w-full flex justify-center gap-3 items-center bg-purple-700 hover:bg-purple-600 text-slate-100 font-semibold py-3 px-6 rounded-xl shadow"
            >
              <CirclePlus className="w-6 h-6" /> Add Task
            </button>
            <button
              onClick={() => setIsEditing(v => !v)}
            >
              Edit
            </button>
          </div>
          <div className="w-[95%]">
            <ToDo isEditing={isEditing} openEdit={openEdit} />
            {showEditModal && (
              <EditModal
                setShowEditModal={setShowEditModal}
                todo={currentTodo}
                itemName={"Task"}
                collection={"todos"}
              />
            )}
            {showModal && (
              <AddItemModal
                setShowModal={setShowModal}
                itemName={"Task"}
                collection={"todos"}
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}
