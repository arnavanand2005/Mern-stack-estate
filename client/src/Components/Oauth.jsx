import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Oauth() {
    const dispatch= useDispatch()
    const navigate = useNavigate()
     const handleGoogleClick = async () => {
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({name : result.user.displayName,
                    email : result.user.email,
                    photo : result.user.photoURL
                })
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')
            
        }
        catch(error){
            console.log("Could Not Log in with Google",error)
        }
    }
  return (
    <button
          className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-4 rounded-xl font-medium shadow-sm hover:shadow-md hover:bg-slate-50 transition-all duration-300"
          onClick={handleGoogleClick}
          >
          <FcGoogle size={24} />
          Continue with Google
    </button>
  )
}
