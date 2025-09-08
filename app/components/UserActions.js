import { CircleUser, Pencil, LogOut } from "lucide-react";

export default function UserActions({ user, handleLogOut, setShowModal }) {
  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center px-5">
      <div className="bg-[#1e293b] rounded-2xl shadow-lg w-full max-w-md px-8 py-6 relative animate-fadeIn">
        <div className="flex justify-start items-center gap-4 mb-4">
          <CircleUser size={48} className="text-white" />
          <div>
            <div className="text-lg font-semibold text-white">{user.name}</div>
            <div className="text-sm text-gray-400">{user.email}</div>
          </div>
        </div>
        <div className="flex justify-between gap-8 py-2">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-[#0f172a] transition-colors"
          >
            <Pencil size={16} /> Edit
          </button>
          <button
            onClick={handleLogOut}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md transition-colors"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
