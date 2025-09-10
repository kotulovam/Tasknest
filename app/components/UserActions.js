import { CircleUser, Pencil, LogOut } from "lucide-react";

export default function UserActions({ user, handleLogOut, setShowModal }) {
  return (
    <div className="fixed inset-0 z-10 flex justify-center items-center px-5 backdrop-blur">
      <div className="relative w-full max-w-md px-8 py-6 sm:px-8 sm:py-6 bg-[#1e293b] rounded-2xl shadow-lg">

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 mb-2">
          <div className="flex items-center">
            <CircleUser size={48} className="text-center" />
          </div>
          <div className="text-base text-center sm:text-left sm:text-lg font-semibold">
            <div>{user.name}</div>
            <div className="text-sm text-slate-400">{user.email}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-8 py-2">
          <button
            onClick={() => setShowModal(false)}
            className="flex flex-1 justify-center items-center gap-2 px-4 py-2 text-sm rounded-lg border border-slate-600  hover:bg-slate-600 transition-colors">
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={handleLogOut}
            className="flex flex-1 justify-center items-center gap-2 px-4 py-2 text-sm text-white bg-purple-700 hover:bg-purple-600 rounded-lg border border-purple-700 transition colors">
            <LogOut size={16} /> Log out
          </button>
        </div>

        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors">
          ✕
        </button>

      </div>
    </div>
  )
}


