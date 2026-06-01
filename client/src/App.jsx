import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

export default function App() {
  return (
    <div>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    </div>
  )
}
