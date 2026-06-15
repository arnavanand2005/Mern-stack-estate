import React, { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { Link , useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';


export default function Header() {
  const { currentUser }= useSelector(state => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  console.log(currentUser);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        <Link
          to="/"
          className="transition-all duration-300 hover:scale-105 hover:drop-shadow-lg"
        >
          <h1 className="font-bold text-lg md:text-2xl flex flex-wrap">
            <span className="text-amber-400">Los Santos </span>
            <span className="text-green-500">Estates</span>
          </h1>
        </Link>
          <form onSubmit={handleSubmit} className="flex items-center bg-gray-200 px-4 py-2 rounded-full shadow-sm">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 text-slate-700"
            onChange={(e) => setSearchTerm(e.target.value)} 
            value={searchTerm}
          />
          <button>
            <FaSearch className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" />
          </button>
        </form>

          <ul className="flex items-center gap-4 md:gap-6 text-sm md:text-lg font-medium">
            <Link to="/">
              <li className="hidden sm:inline text-slate-700 hover:text-amber-400 transition-colors duration-300">
                Home
              </li>
            </Link>

            <Link to="/about">
              <li className="hidden sm:inline text-slate-700 hover:text-amber-400 transition-colors duration-300">
                About
              </li>
            </Link>

            <Link to="/profile">
            {currentUser ? (
               <img src={currentUser.avatar}
              alt="profile"
              className="h-10 w-10 rounded-full object-cover"/>
            ) : (
               <li className="text-slate-700 hover:text-amber-400 transition-colors duration-300"> Sign In </li> )}
            </Link>
          </ul>
      </div>
    </header>
  );
}
