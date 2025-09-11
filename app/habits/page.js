"use client"

import React from "react"
import { useState, useEffect } from "react"
import { CirclePlus, Pencil } from "lucide-react";
import Habit from "../components/Habit";
import AddItemModal from "../components/AddItemModal";
import EditModal from "../components/EditModal";

export default function Habits() {
  const [habits, setHabits] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [currentHabit, setCurrentHabit] = useState(null)

  useEffect(() => {
    const loadHabits = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/habits")
        const data = await res.json()
        setHabits(data.habits || [])
      } catch (err) {
        console.log("Something went wrong.", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadHabits()
  }, [])

  const updateHabit = async (id, patch) => {
    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patch)
      });
      if (!res.ok) throw new Error("Update failed.");
    } catch (e) {
      console.error("Something went wrong.", e)
    }
  }

  const sortHabits = (a, b) => {
    if (a.isChecked !== b.isChecked) {
      return a.isChecked ? 1 : -1;
    }
  };

  const handleTickClick = (id) => {
    const current = habits.find(habit => habit.id === id);
    const next = !current.isChecked;

    setHabits(prevHabits => {
      const updated = prevHabits.map(habit =>
        habit.id === id ? { ...habit, isChecked: next } : habit
      )
      return updated.sort(sortHabits);
    })
    updateHabit(id, { isChecked: next })
  }

  const openEdit = (habit) => {
    setCurrentHabit(habit)
    setShowEditModal(true)
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-[95%] flex gap-4">
        <button onClick={() => { setShowModal(true) }} className="sticky w-full flex justify-center items-center gap-3 bg-purple-700 hover:bg-purple-600 text-slate-100 font-semibold py-3 px-6 rounded-xl shadow">
          <CirclePlus className="w-6 h-6" /> Add Habit
        </button>
        <button
          onClick={() => setIsEditing(prev => !prev)}
          className="sticky flex justify-center gap-3 items-center bg-purple-700 hover:bg-purple-600 text-slate-100 py-3 px-6 rounded-xl shadow"
        >
          <Pencil className="w-5 h-5" />
        </button>
      </div>
      {showModal && <AddItemModal setShowModal={setShowModal} itemName={"Habit"} collection={"habits"} />}
      <div className="w-[95%]">
        {isLoading ? (<p>Loading...</p>) : (
          habits.length === 0 ? (
            <p>No record of habits.</p>
          ) : (
            <>
              <Habit habits={habits} setHabits={setHabits} handleTickClick={handleTickClick} isEditing={isEditing} openEdit={openEdit} />
              {showEditModal && (
                <EditModal
                  setShowEditModal={setShowEditModal}
                  habit={currentHabit}
                  itemName={"Habit"}
                  collection={"habits"}
                />
              )}
            </>
          )

        )}
      </div>
    </div>)
}
