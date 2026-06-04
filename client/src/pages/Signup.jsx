import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Oauth from '../Components/Oauth';

function Signup() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(formData);
      setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    setLoading(true);
    setError(null);
    const res = await fetch ("api/auth/signup", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData)
    });
    const data = await res.json();

    if(!res.ok){
      setError(data.message || "Failed to sign up");
      setLoading(false);
      return;
    }
    setFormData({});
    setLoading(false);
    console.log(data);
    navigate("/signin");
  }
catch(error){
  setError("An error occurred. Please try again.");
  setLoading(false);}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/50">

        <h1 className="text-4xl font-bold text-center text-slate-700 mb-2">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Join Los Santos Estates today
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="Username"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            id='username'
            onChange={handleChange}
            required
            value={formData.username || ''}
          />

          <input
            type="email"
            placeholder="Email"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
            id='email'
            onChange={handleChange}
            required
            value={formData.email || ''}
          />

          <input
            type="password"
            placeholder="Password"
            className="border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            id='password'
            onChange={handleChange}
            required
            value={formData.password || ''}
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-4 rounded-xl font-semibold tracking-wide hover:bg-green-700 hover:scale-[1.02] transition-all duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "SIGN UP"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="grow h-px bg-slate-300"></div>
          <span className="px-3 text-slate-400 text-sm">OR</span>
          <div className="grow h-px bg-slate-300"></div>
        </div>

       <Oauth/>

        <p className="text-center mt-6 text-slate-600">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-all duration-300"
          >
            Sign In
          </Link>
        </p>

        {error && (
        <p className="text-red-500 text-center mt-2">
        {error}
        </p> 
        )}

      </div>
    </div>
  );
}

export default Signup;