"use client"

import CheckBoxes from "../components/CheckBoxes";
import { Sun, SunMoon, Moon, Pencil } from "lucide-react"

export default function Habit({ habits, handleTickClick, isEditing, openEdit }) {

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <div
          onClick={() => isEditing ? openEdit(habit) : handleTickClick(habit.id)}
          className="flex justify-between gap-5 items-center w-full h-10 bg-slate-800 hover:bg-slate-700 text-slate-100 font-light py-3 px-6 rounded-xl shadow border border-slate-400"
          key={habit.id}
        >
          <div className="flex items-center w-full">
            {isEditing ? (
              <div className="flex justify-between w-full items-center">
                <span className="px-3">{habit.name}</span>
                <Pencil size={18} />
              </div>
            ) : (
              <div className="flex justify-start w-full items-center">
                <CheckBoxes checked={habit.isChecked}
                  onChange={() => handleTickClick(habit.id)} />
                <span>{habit.name}</span>
              </div>
            )}
          </div>

          {!isEditing && (
            <div>
              {habit.habitTime === "morning" && <SunMoon size={20} />}
              {habit.habitTime === "day" && <Sun size={20} />}
              {habit.habitTime === "evening" && <Moon size={20} />}
            </div>
          )}

        </div>
      ))}
    </div>
  )
}
