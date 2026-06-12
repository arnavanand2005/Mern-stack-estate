import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Header from './Components/Header'
import PrivateRoute from './Components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'


export default function App() {
  return (
    <div>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/listing/:listingId" element={<Listing />}></Route>
                <Route element={<PrivateRoute />} >
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/create-listing" element={<CreateListing />} />
                  <Route path="/update-listing/:listingId" element={<UpdateListing />} />
                </Route>
            </Routes>
        </Router>
    </div>
  )
}
