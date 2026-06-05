import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null)

  const [file, setFile] = useState(null)
  const [formData, setFormData] = useState({})

  // Upload status states
  const [imageUploadError, setImageUploadError] = useState('')
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false)
  const [imageUploading, setImageUploading] = useState(false)
  
  // FIX: Added the missing progress state variable
  const [imagePercent, setImagePercent] = useState(0)

  // Track regular text input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  // Handle Cloudinary Image Upload with Progress Tracking
  const storeImage = (file) => {
    setImageUploading(true)
    setImageUploadError('')
    setImageUploadSuccess(false)
    setImagePercent(0) // Reset progress counter

    const data = new FormData()
    data.append('file', file)
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME

    // Using XMLHttpRequest to track raw upload progress
    const xhr = new XMLHttpRequest()
    xhr.open('POST', `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true)

    // 1. Track upload progress percentage
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100)
        setImagePercent(progress)
      }
    }

    // 2. Handle completion response from Cloudinary
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

    // 3. Handle network level errors
    xhr.onerror = () => {
      setImageUploadError('Network error during upload')
      setImageUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }

    xhr.send(data)
  }

  // Monitor file selection
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

  // Handle Form Submission to your Backend API
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (imageUploading) return
    
    try {
      console.log('Submitting Form Data to Backend:', formData)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-semibold text-slate-700 text-center my-7">
        YOUR PROFILE
      </h1>

      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-4 bg-white p-6 rounded-2xl shadow-md"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="h-24 w-24 self-center rounded-full object-cover border-4 border-green-400 cursor-pointer hover:opacity-90 transition"
        />

        {/* Dynamic upload progress message display */}
        {imageUploading && (
          <p className="text-center text-sm text-slate-500">
            {imagePercent > 0 && imagePercent < 100 
              ? `Uploading: ${imagePercent}%` 
              : 'Processing image...'}
          </p>
        )}

        {imageUploadSuccess && (
          <p className="text-center text-sm text-green-600">
            ✓ Image uploaded successfully
          </p>
        )}

        {imageUploadError && (
          <p className="text-center text-sm text-red-500">
            {imageUploadError}
          </p>
        )}

        <input
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser?.username}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          defaultValue={currentUser?.email}
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="border border-slate-300 p-3 rounded-lg focus:outline-none focus:border-green-500"
        />

        <button
          disabled={imageUploading}
          type="submit"
          className="bg-green-600 text-white p-3 rounded-lg uppercase font-semibold hover:bg-green-700 disabled:opacity-80 transition"
        >
          {imageUploading ? 'Uploading...' : 'Update'}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer hover:underline">
          Delete Account
        </span>

        <span className="text-red-500 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
    </div>
  )
}

export default Profile;