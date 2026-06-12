import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CreateListing() {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 100,
    discountedPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
    imageUrls: [], 
  });

  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
    } else if (
      e.target.id === 'parking' || 
      e.target.id === 'furnished' || 
      e.target.id === 'offer'
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(uploadImageToCloudinary(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (Max limit: 2MB per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload a maximum of 6 images per property listing.');
      setUploading(false);
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); 
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: data,
    });

    if (!res.ok) {
      throw new Error('Failed to process asset payload.');
    }

    const fileData = await res.json();
    return fileData.secure_url; 
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1) {
        return setError('You must upload at least one image!');
      }
      
      if (+formData.regularPrice < +formData.discountedPrice) {
        return setError('Discounted price must be lower than your regular price specifications!');
      }

      setLoading(true);
      setError(false);

      const submissionPayload = {
        ...formData,
        userRef: currentUser._id,
      };

      if (submissionPayload.type === 'sale') {
        submissionPayload.discountedPrice = 0; 
        submissionPayload.offer = false;

      }

      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload), 
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
        return;
      }

      navigate(`/listing/${data._id}`);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className='p-6 max-w-5xl mx-auto bg-slate-50/50 rounded-3xl my-6 border border-slate-100 shadow-xs'>
        <h1 className='text-3xl font-extrabold text-center my-7 text-slate-800 tracking-tight'>
            Create a <span className='text-emerald-600'>Listing</span>
        </h1>
        
        <form onSubmit={handleSubmit} className='flex flex-col md:flex-row gap-8 items-start'>
            
            <div className='flex flex-col gap-5 flex-1 w-full'>
                <input 
                 type="text"
                 placeholder='Name'
                 className='border border-slate-200 p-3 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200'
                 id='name'
                 maxLength={64}
                 minLength={10}
                 onChange={handleChange}
                 value={formData.name}
                 required/>

                <textarea
                 placeholder='Description'
                 className='border border-slate-200 p-3 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200 min-h-30'
                 id='description'
                 onChange={handleChange}
                 value={formData.description}
                 required/>

                <input type="text"
                 placeholder='Address'
                 className='border border-slate-200 p-3 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200'
                 id='address'
                 maxLength={90}
                 minLength={10}
                 onChange={handleChange}
                 value={formData.address}
                 required/>
                 
                <div className='flex gap-6 flex-wrap py-2 border-y border-slate-100 my-1'>
                    <label htmlFor="sale" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='sale'
                         className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm'
                         onChange={handleChange}
                          checked={formData.type === 'sale'} />
                        <span>Sell</span>
                    </label>

                    <label htmlFor="rent" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox"
                        id='rent'
                         className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm'
                        onChange={handleChange}
                        checked={formData.type === 'rent'} />
                        <span>Rent</span>
                    </label>

                    <label htmlFor="parking" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='parking'
                         className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm'
                          onChange={handleChange}
                          checked={formData.parking} />
                        <span>Parking Spot</span>
                    </label>

                    <label htmlFor="furnished" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox"
                         id='furnished'
                         className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm'
                          onChange={handleChange} 
                          checked={formData.furnished} />
                        <span>Furnished</span>
                    </label>

                    {/* 🎯 UI UPDATE: Only render the Offer option if it is NOT for full asset sale */}
                    {formData.type !== 'sale' && (
                      <label htmlFor="offer" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                          <input type="checkbox"
                           id='offer'
                            className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm'
                            onChange={handleChange}
                             checked={formData.offer} />
                          <span>Offer</span>
                      </label>
                    )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2'>
                    <div className='flex gap-3 items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <p className='text-xs font-bold text-slate-500 uppercase tracking-wide'>Beds</p>
                      <input
                        type="number"
                        id='bedrooms'
                        className='w-16 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={1}
                        max={40}
                        required
                        onChange={handleChange}
                        value={formData.bedrooms}
                      />
                    </div>
                    
                    <div className='flex gap-3 items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <p className='text-sm font-bold text-slate-500 uppercase tracking-wide'>Baths</p>
                      <input
                        type="number"
                        id='bathrooms'
                        className='w-16 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={1}
                        max={40}
                        required
                        onChange={handleChange}
                        value={formData.bathrooms}
                      />
                    </div>

                    <div className='flex gap-3 items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <div className='flex flex-col text-left leading-none'>
                        <p className='text-xs font-bold text-slate-600'>Regular Price</p>
                        
                        {/* 🎯 UI UPDATE: Show ($ / month) only if it is NOT on sale mode */}
                        {formData.type !== 'sale' && (
                          <span className='text-[10px] text-slate-400 font-medium mt-1'>($ / month)</span>
                        )}
                      </div>
                      <input
                        type="number"
                        id='regularPrice'
                        className='w-28 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={50}
                        max={1000000}
                        required
                        onChange={handleChange}
                        value={formData.regularPrice}
                      />
                    </div>

                    {/* 🎯 UI UPDATE: Completely hide the Discount input card layout frame entirely when selling */}
                    {formData.type !== 'sale' && (
                      <div className='flex gap-3 items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-2xs'>
                        <div className='flex flex-col text-left leading-none'>
                          <p className='text-xs font-bold text-slate-600'>
                            Discounted <span className='text-amber-600'>Price</span>
                          </p>
                          <span className='text-[10px] text-slate-400 font-medium mt-1'>($ / month)</span>
                        </div>
                        <input
                          type="number"
                          id='discountedPrice'
                          className='w-28 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                          min={0}
                          max={1000000}
                          required={formData.type !== 'sale'}
                          onChange={handleChange}
                          value={formData.discountedPrice}
                        />
                      </div>
                    )}
                </div>
            </div>

            <div className='flex flex-col flex-1 w-full md:sticky md:top-6 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs'>
                <p className='font-bold text-slate-700 text-sm tracking-wide uppercase mb-1'>
                    Images
                </p>
                <p className='text-slate-400 font-normal normal-case text-xs mb-4'>
                    The first image will be the cover position (maximum of 6 layout uploads)
                </p>
                
                <div className='flex flex-col gap-3'>
                    <input 
                      className='rounded-xl w-full bg-slate-50 p-3 border border-slate-200 shadow-2xs text-sm file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:cursor-pointer transition-all focus:outline-none' 
                      type="file" 
                      id='images' 
                      accept='image/*' 
                      multiple
                      onChange={(e)=>setFiles(e.target.files)}
                    />
                    
                    <button 
                      type='button'
                      disabled={uploading}
                      onClick={handleImageSubmit}
                      className='w-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold p-3.5 rounded-xl shadow-2xs hover:bg-emerald-100/70 active:scale-[0.99] transition-all duration-200 uppercase text-xs tracking-wider disabled:opacity-50'
                    >
                      {uploading ? 'Uploading files...' : 'Upload Images'}
                    </button>
                </div>

                {imageUploadError && (
                  <p className='text-red-500 text-xs font-semibold mt-2 text-center'>{imageUploadError}</p>
                )}

                {formData.imageUrls.length > 0 && (
                  <div className='flex flex-col gap-2 mt-4 max-h-50 overflow-y-auto border-t pt-3 border-slate-100'>
                    {formData.imageUrls.map((url, index) => (
                      <div key={url} className='flex items-center justify-between p-2 border rounded-xl bg-slate-50/40 border-slate-100'>
                        <img src={url} alt="listing thumbnail preview" className='w-16 h-12 object-cover rounded-lg shadow-3xs' />
                        <button 
                          type='button' 
                          onClick={() => handleRemoveImage(index)}
                          className='text-xs font-bold text-red-500 hover:text-red-700 uppercase bg-red-50 hover:bg-red-100/50 px-3 py-1.5 rounded-lg transition-colors'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                {error && (
                  <p className='text-red-500 text-xs font-semibold mt-4 text-center bg-red-50 border border-red-100 p-2 rounded-xl'>{error}</p>
                )}
                
                <button 
                  type="submit" 
                  disabled={loading || uploading}
                  className='w-full mt-8 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold p-4 rounded-xl shadow-md hover:from-amber-600 hover:to-amber-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-50 transition-all duration-200 uppercase text-sm tracking-widest'
                >
                    {loading ? 'Creating Listing...' : 'Submit Listing'}
                </button>
            </div>
            
        </form>
    </main>
  )
}

export default CreateListing;