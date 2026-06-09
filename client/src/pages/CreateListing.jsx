import React from 'react'

function CreateListing() {
  return (
    <main className='p-6 max-w-4xl mx-auto bg-slate-50/50 rounded-3xl my-6 border border-slate-100 shadow-xs'>
        <h1 className='text-3xl font-extrabold text-center my-7 text-slate-800 tracking-tight'>
            Create a <span className='text-emerald-600'>Listing</span>
        </h1>
        
        <form className='flex flex-col sm:flex-row gap-6'>
            <div className='flex flex-col gap-5 flex-1'>
                <input 
                 type="text"
                 placeholder='Name'
                 className='border border-slate-200 p-3 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200'
                 id='name'
                 maxLength={64}
                 minLength={10}
                 required/>

                <textarea
                 placeholder='Description'
                 className='border border-slate-200 p-3 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200 min-h-[100px]'
                 id='description'
                 maxLength={500} 
                 minLength={10}
                 required/>

                <input type="text"
                 placeholder='Address'
                 className='border border-slate-200 p-3 rounded-xl bg-white shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all duration-200'
                 id='address'
                 maxLength={90}
                 minLength={10}
                 required/>
                 
                <div className='flex gap-6 flex-wrap py-2'>
                    <label htmlFor="sale" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='sale' className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm' />
                        <span>Sell</span>
                    </label>

                    <label htmlFor="rent" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='rent' className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm' />
                        <span>Rent</span>
                    </label>

                    <label htmlFor="parking" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='parking' className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm' />
                        <span>Parking Spot</span>
                    </label>

                    <label htmlFor="furnished" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='furnished' className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm' />
                        <span>Furnished</span>
                    </label>

                    <label htmlFor="offer" className='flex gap-2 items-center cursor-pointer font-semibold text-slate-600 hover:text-amber-500 transition-colors duration-200'>
                        <input type="checkbox" id='offer' className='w-5 h-5 accent-emerald-600 cursor-pointer rounded-sm' />
                        <span>Offer</span>
                    </label>
                </div>

                <div className='flex flex-wrap gap-6 mt-2'>
                    <div className='flex gap-3 items-center bg-white p-2 px-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <input
                        type="number"
                        id='bedrooms'
                        className='w-14 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={1}
                        max={40}
                        required
                        defaultValue={1}
                      />
                      <p className='text-sm font-bold text-slate-500 uppercase tracking-wide'>Beds</p>
                    </div>
                    
                    <div className='flex gap-3 items-center bg-white p-2 px-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <input
                        type="number"
                        id='bathrooms'
                        className='w-14 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={1}
                        max={40}
                        required
                        defaultValue={1}
                      />
                      <p className='text-sm font-bold text-slate-500 uppercase tracking-wide'>Baths</p>
                    </div>

                    <div className='flex gap-3 items-center bg-white p-2 px-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <input
                        type="number"
                        id='regularPrice'
                        className='w-24 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={1}
                        max={1000000}
                        required
                        defaultValue={100}
                      />
                      <div className='flex flex-col text-left leading-none'>
                        <p className='text-xs font-bold text-slate-600'>Regular Price</p>
                        <span className='text-[10px] text-slate-400 font-medium mt-0.5'>($ / month)</span>
                      </div>
                    </div>

                    <div className='flex gap-3 items-center bg-white p-2 px-3 rounded-xl border border-slate-200 shadow-2xs'>
                      <input
                        type="number"
                        id='discountedPrice'
                        className='w-24 text-center font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20' 
                        min={0}
                        max={1000000}
                        required
                        defaultValue={0}
                      />
                      <div className='flex flex-col text-left leading-none'>
                        <p className='text-xs font-bold text-slate-600 text-amber-600'>Discounted Price</p>
                        <span className='text-[10px] text-slate-400 font-medium mt-0.5'>($ / month)</span>
                      </div>
                    </div>
                </div>
            </div>
        </form>

        <div className='mt-8 pt-6 border-t border-slate-200/80'>
          <div className='flex flex-col gap-4'>
              <p className='font-bold text-slate-700 text-sm tracking-wide uppercase'>
                Images :
                <span className='text-slate-400 font-normal ml-2 normal-case text-xs'>The first image will be the cover (max 6)</span>
              </p>
              
              <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-4'>
                <input 
                  className='rounded-xl w-full bg-white p-3 border border-slate-200 shadow-2xs text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-all focus:outline-none' 
                  type="file" 
                  id='images' 
                  accept='image/*' 
                  multiple
                />
                
                <button className='bg-linear-to-r from-emerald-600 to-emerald-700 text-white font-bold px-6 py-4 rounded-xl border border-emerald-700 shadow-md hover:from-emerald-700 hover:to-emerald-800 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 uppercase text-xs tracking-wider whitespace-nowrap min-w-[120px]'>
                  Upload
                </button>
              </div>
            </div>
            
            <button className='w-full mt-6 bg-linear-to-r from-amber-500 to-amber-600 text-white font-bold p-4 rounded-xl shadow-md hover:from-amber-600 hover:to-amber-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-200 uppercase text-sm tracking-widest'>
                Submit Listing
            </button>
        </div>
    </main>
  )
}

export default CreateListing;