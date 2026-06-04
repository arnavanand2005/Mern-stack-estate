import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { signInStart,signInFailiure,signInSuccess } from '../redux/user/userSlice';
import Oauth from '../Components/Oauth';

function Signin() {
  const [formData, setFormData] = useState({});


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
       
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailiure(data.message))
        return;
      }
      console.log("Login successful", data);
      dispatch(signInSuccess(data))
      navigate('/');

    } catch (error) {
      dispatch(signInFailiure(error.message))
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] rounded-3xl p-8 border border-white/60">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold m-4">
            <span className="text-amber-500">Los Santos</span>{' '}
            <span className="text-green-600">Estates</span>
          </h2>

          <p className="text-slate-500 mt-2">
            Welcome back
          </p>
        </div>

        <h1 className="text-3xl font-bold text-center text-slate-700 mb-6">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username || ''}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 bg-white/80 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300 shadow-sm"
          />

          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password || ''}
            onChange={handleChange}
            required
            className="w-full border border-slate-200 bg-white/80 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-200 transition-all duration-300 shadow-sm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? 'Signing In...' : 'SIGN IN'}
          </button>

        </form>

        {error && (
          <div className="mt-4 rounded-lg bg-red-100 border border-red-200 p-3">
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          </div>
        )}

        <div className="flex items-center my-7">
          <div className="grow border-t border-slate-300"></div>

          <span className="px-4 text-slate-400 text-sm font-medium">
            OR
          </span>

          <div className="grow border-t border-slate-300"></div>
        </div>

        <Oauth/>

        <p className="text-center mt-6 text-slate-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-all duration-300"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signin;