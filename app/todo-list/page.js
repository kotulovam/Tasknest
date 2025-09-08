"use client";

import React, { useEffect, useState } from "react"
import { Star } from "lucide-react"
import CheckBoxes from "../components/CheckBoxes";

export default function ToDo() {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTodos = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/todos")
        const data = await res.json()
        setTodos(data.todos || [])
      } catch (err) {
        console.log("Something went wrong.", err)
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])

  const updateTodo = async (id, patch) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patch)
      });
      if (!res.ok) throw new Error("Update failed");
    } catch (e) {
      console.error("Something went wrong.", e)
    }
  }

  const sortTodos = (a, b) => {
    if (a.isChecked !== b.isChecked) {
      return a.isChecked ? 1 : -1;
    }
    if (a.isPriority === b.isPriority) return 0;
    return a.isPriority ? -1 : 1;
  };

  const handleStarClick = (id) => {
    const current = todos.find(todo => todo.id === id);
    const next = !current.isPriority;

    setTodos(prevTodos => {
      const updated = prevTodos.map(todo =>
        todo.id === id
          ? { ...todo, isPriority: !todo.isPriority }
          : todo
      );

      return updated.sort(sortTodos);
    });
    updateTodo(id, { isPriority: next })
  };
  ;

  const handleTickClick = (id) => {
    const current = todos.find(todo => todo.id === id);
    const next = !current.isChecked;

    setTodos(prevTodos => {
      const updated = prevTodos.map(todo =>
        todo.id === id ? { ...todo, isChecked: next } : todo
      )
      return updated.sort(sortTodos);
    })

    updateTodo(id, { isChecked: next })
  }

  return (
    <div className="space-y-3">
      {isLoading ? (<p>Loading...</p>) : (
        todos.length === 0 ? (
          <p>No record of tasks.</p>
        ) : (
          todos.map((todo) => (
            <div className="flex justify-between gap-5 items-center w-full h-10 bg-slate-800 hover:bg-slate-700 text-slate-100 font-light py-3 px-6 rounded-xl shadow border border-slate-400" key={todo.id}
              onClick={() => handleTickClick(todo.id)} >
              <div className="flex justify-start items-center">
                <CheckBoxes checked={todo.isChecked} onClick={(e) => e.stopPropagation()} onChange={() => handleTickClick(todo.id)} />
                {todo.name}
              </div>
              <Star
                onClick={(e) => {
                  e.stopPropagation();
                  handleStarClick(todo.id)
                }}
                size={20}
                color={todo.isPriority ? "#FFD300" : "	#D3D3D333"}
                fill={todo.isPriority ? "#FFD300" : "none"}
              />
            </div>
          ))
        )
      )}
    </div>
  )
}

