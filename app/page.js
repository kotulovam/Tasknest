"use client"

import React from "react"
import { useState } from "react"
import { CirclePlus } from "lucide-react"
import AddItemModal from "@/app/components/AddItemModal"
import ToDo from "./todo-list/page"

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-[95%]" >
        <button onClick={() => setShowModal(true)} className="sticky w-full flex justify-center gap-3 items-center bg-purple-700 hover:bg-purple-600 text-slate-100 font-semibold py-3 px-6 rounded-xl shadow"><CirclePlus className="w-6 h-6" /> Add Task</button>
      </div>
      <div className="w-[95%]">
        <ToDo />
        {showModal && <AddItemModal setShowModal={setShowModal} />} </div>
    </div>
  )
}

export default App
