import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { updateUserStart, updateUserFailiure, updateUserSuccess } from '../redux/user/userSlice'

function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const fileRef = useRef(null)

  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)

  const [imageUploadError, setImageUploadError] = useState('')
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  const [imagePercent, setImagePercent] = useState(0)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const storeImage = (file) => {
    setImageUploading(true)
    setImageUploadError('')
    setImageUploadSuccess(false)
    setUpdateSuccess(false)
    setImagePercent(0)

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true)

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100)
        setImagePercent(progress)
      }
    }

    xhr.onload = () => {
      try {
        const response = JSON.parse(xhr.responseText)
        
        if (xhr.status === 200 && response.secure_url) {
          setFormData((prev) => ({
            ...prev,
            avatar: response.secure_url,
          }))
          setImageUploadSuccess(true)
        } else {
          setImageUploadError('Image upload failed')
        }
      } catch (err) {
        setImageUploadError('Failed to parse upload response')
        console.error(err)
      } finally {
        setImageUploading(false)
        if (fileRef.current) fileRef.current.value = ''
      }
    }

    xhr.onerror = () => {
      setImageUploadError('Network error during upload')
      setImageUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }

    xhr.send(data)
  }

  useEffect(() => {
    if (!file) return

    setImageUploadError('')
    setImageUploadSuccess(false)

    if (!file.type.startsWith('image/')) {
      setImageUploadError('Please select an image file')
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageUploadError('Image size must be less than 2 MB')
      if (fileRef.current) fileRef.current.value = ''
      return
    }

    storeImage(file)
  }, [file])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (imageUploading || loading) return
    setUpdateSuccess(false)
    
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json',
        },
        body : JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false){
        dispatch(updateUserFailiure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailiure(error.message));
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 my-10">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-8 tracking-tight">
        Profile Settings
      </h1>

      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-5 bg-white p-8 rounded-2xl shadow-xl border border-slate-100"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="relative self-center group">
          <img
            onClick={() => !imageUploading && fileRef.current.click()}
            src={formData.avatar || currentUser?.avatar}
            alt="profile"
            className={`h-28 w-28 rounded-full object-cover border-4 border-slate-100 shadow-md transition duration-300 ${imageUploading ? 'opacity-50' : 'cursor-pointer hover:scale-105 hover:border-emerald-400'}`}
          />
          {!imageUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          )}
        </div>

        {imageUploading && (
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
            <div 
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300" 
              style={{ width: `${imagePercent}%` }}
            ></div>
            <p className="text-center text-xs font-medium text-slate-500 mt-1.5">
              {imagePercent > 0 && imagePercent < 100 
                ? `Uploading image: ${imagePercent}%` 
                : 'Processing raw files...'}
            </p>
          </div>
        )}

        {imageUploadSuccess && (
          <p className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-100">
            ✓ Avatar updated successfully
          </p>
        )}

        {imageUploadError && (
          <p className="text-center text-xs font-semibold text-rose-600 bg-rose-50 py-1.5 px-3 rounded-lg border border-rose-100">
            {imageUploadError}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Username</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser?.username}
            onChange={handleChange}
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition duration-200 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Email Address</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser?.email}
            onChange={handleChange}
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition duration-200 bg-slate-50/50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            id="password"
            onChange={handleChange}
            className="border border-slate-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition duration-200 bg-slate-50/50"
          />
        </div>

        <button
          disabled={imageUploading || loading}
          type="submit"
          className="bg-slate-800 text-white p-3.5 rounded-xl uppercase font-bold tracking-wide hover:bg-slate-900 active:scale-[0.99] disabled:opacity-50 transition duration-200 shadow-md shadow-slate-800/10 mt-2"
        >
          {imageUploading ? 'Uploading Image...' : loading ? 'Saving Account Details...' : 'Save Changes'}
        </button>
      </form>

      {error && (
        <p className="text-center text-xs font-semibold text-rose-600 bg-rose-50 py-2 px-4 rounded-xl border border-rose-100 mt-4 shadow-sm">
          Error: {error}
        </p>
      )}

      {updateSuccess && (
        <p className="text-center text-xs font-semibold text-emerald-600 bg-emerald-50 py-2 px-4 rounded-xl border border-emerald-100 mt-4 shadow-sm">
          ✓ Profile settings saved successfully!
        </p>
      )}

      <div className="flex justify-between mt-6 px-2 text-sm font-medium">
        <span className="text-rose-500 cursor-pointer hover:text-rose-600 hover:underline transition duration-200">
          Delete Account
        </span>

        <span className="text-slate-500 cursor-pointer hover:text-slate-700 hover:underline transition duration-200">
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default Profile;