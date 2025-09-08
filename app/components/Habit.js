"use client"

import CheckBoxes from "../components/CheckBoxes";
import { Sun, SunMoon, Moon } from "lucide-react"

export default function Habit({ habits, handleTickClick }) {

  return (
    <div className="flex flex-col gap-3">
      {habits.map((habit) => (
        <div onClick={() => handleTickClick(habit.id)}
          className="flex justify-between gap-5 items-center w-full h-10 bg-slate-800 hover:bg-slate-700 text-slate-100 font-light py-3 px-6 rounded-xl shadow border border-slate-400"
          key={habit.id}
        >
          <div className="flex justify-start items-center">
            <CheckBoxes
              checked={habit.isChecked}
              onChange={() => handleTickClick(habit.id)}
            />
            {habit.name}
          </div>
          <div>
            {habit.habitTime === "morning" && <SunMoon size={20} />}
            {habit.habitTime === "day" && <Sun size={20} />}
            {habit.habitTime === "evening" && <Moon size={20} />}
          </div>
        </div>
      ))}
    </div>
  )
}
