import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/50">

        <h1 className="text-4xl font-bold text-center text-slate-700 mb-2">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Join Los Santos Estates today
        </p>

        <form className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Username"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-4 rounded-xl font-semibold tracking-wide hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            SIGN UP
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">OR</span>
          <div className="flex-grow h-px bg-slate-300"></div>
        </div>

        <button
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 py-4 rounded-xl font-medium hover:bg-slate-50 hover:scale-[1.02] transition-all duration-300 shadow-sm"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-all duration-300"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;