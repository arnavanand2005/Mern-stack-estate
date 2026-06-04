import React from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className="max-w-lg mx-auto p-6">
    <h1 className="text-3xl font-semibold text-slate-700 text-center my-7">
      Profile
    </h1>
  
    <form className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md">
      <img
        src={currentUser.avatar}
        alt="profile"
        className="h-24 w-24 self-center rounded-full object-cover border-4 border-green-400 cursor-pointer"
      />
  
      <input
        type="text"
        placeholder="Username"
        defaultValue={currentUser.username}
        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
      />
  
      <input
        type="email"
        placeholder="Email"
        defaultValue={currentUser.email}
        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
      />
  
      <input
        type="password"
        placeholder="Password"
        className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
      />
  
      <button
        className="
        bg-green-600
        text-white
        p-3
        rounded-lg
        uppercase
        font-semibold
        hover:bg-green-700
        transition"
      >
        Update
      </button>
    </form>
  
    <div className="flex justify-between mt-5">
      <span className="text-red-500 cursor-pointer hover:underline">
        Delete Account
      </span>
  
      <span className="text-slate-700 cursor-pointer hover:text-green-600">
        Sign Out
      </span>
    </div>
  </div>
  )
}

export default Profile