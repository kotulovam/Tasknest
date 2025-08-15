import Link from "next/link"
import React from "react"
import { ListTodo, Utensils,  BarChart2, House } from "lucide-react";

const Links = [
  { href: "/", label: "Home", icon: House },
  { href: "/meals", label: "Meals", icon: Utensils },
  { href: "/habits", label: "Habits", icon: ListTodo },
  { href: "/stats", label: "Stats", icon: BarChart2 },
];

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0  bg-slate-800 shadow-md z-50 text-xs text-slate-100">
      <div>
        <ul className="flex justify-around items-center h-16">
          {Links.map(({ href, label, icon: Icon }) => (
            <li key={href} className="flex flex-col items-center">
              <Link href={href} className="capitalize flex flex-col items-center">
                <Icon className="w-5 h-5 mb-1" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

      </div>
    </nav>
  )
}

export default Navbar
