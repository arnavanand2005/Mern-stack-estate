import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <header className='bg-slate-300 shadow-md'>
        <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Link to='/'
        className='transition-all duration-300 hover:scale-105 hover:drop-shadow-lg'>
        <h1 className='font-bold text-sm md:text-2xl py-3 pl-1.5 flex flex-wrap'>
            <span className='text-amber-400 '>Los Santos </span> 
            <span className='text-green-500'>Estates</span>
        </h1>
        </Link>

        <form className='flex items-center bg-gray-200 p-3 rounded-xl'>
            <input
             type="text" 
             placeholder='Search...'
             className='bg-transparent focus:outline-none w-24 sm:w-60'
             />
            <FaSearch className='inline-block ml-1 text-gray-500'/>
        </form>

        <ul className='flex space-x-4 text-sm  gap-1 md:text-lg font-medium'>
             <Link to={'/'}>
            <li className='hover:text-amber-400 hidden sm:inline text-slate-700 transition-colors duration-300'>
                Home
            </li>
            </Link>
            <Link to={'/about'}>
            <li className='hover:text-amber-400 hidden sm:inline text-slate-700 transition-colors duration-300'>
                About
            </li>
            </Link>
            <Link to={'/profile'}>
            <li className='hover:text-amber-400 hidden sm:inline transition-colors text-slate-700 duration-300'>
                Profile
            </li>
            </Link>
            <Link to={'/signin'}>
            <li className='hover:text-amber-400 transition-colors text-slate-700 duration-300'>
                Sign-In
            </li>
            </Link>
           
        </ul>
        </div>
    </header>
  )
}
