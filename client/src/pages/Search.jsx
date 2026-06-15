import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen bg-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-900'>
        
        <div className='p-8 bg-slate-200 border-b-2 md:border-b-0 md:border-r border-slate-300 shadow-2xl w-full md:w-96 shrink-0 space-y-6'>
            
            <div className="border-b border-slate-400 pb-4">
                <h2 className="text-xs font-black text-slate-800 uppercase tracking-widest flex items-center justify-between">
                    <span>Asset Radar Filters</span>
                    <span className="text-[9px] bg-green-600 text-white px-2 py-0.5 rounded font-black tracking-normal shadow-sm animate-pulse">
                        RADAR ACTIVE
                    </span>
                </h2>
            </div>

            <form className="space-y-6">
                
                <div className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider'>Search Term</label>
                    <input 
                        type="text" 
                        placeholder='Specify coordinate or name...'
                        id='searchTerm'
                        className='p-3 bg-white text-slate-950 placeholder:text-slate-400 text-sm font-semibold rounded-xl border border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white outline-none transition-all duration-300 shadow-inner'
                    />
                </div>

                <div className='space-y-2.5'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider block'>Listing Type</label>
                    <div className='grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 uppercase tracking-tight'>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-amber-400 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='all' className='w-4 h-4 accent-amber-500 rounded cursor-pointer' />
                            <span className="group-hover:text-amber-500 transition-colors">Rent & Sale</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='rent' className='w-4 h-4 accent-green-600 rounded cursor-pointer' />
                            <span className="group-hover:text-green-600 transition-colors">Rent</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='sale' className='w-4 h-4 accent-green-600 rounded cursor-pointer' />
                            <span className="group-hover:text-green-600 transition-colors">Sale</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-amber-400 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='offer' className='w-4 h-4 accent-amber-500 rounded cursor-pointer' />
                            <span className="group-hover:text-amber-500 transition-colors">Offer</span>
                        </div>
                    </div>
                </div>

                <div className='space-y-2.5'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider block'>Asset Amenities</label>
                    <div className='grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 uppercase tracking-tight'>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='parking' className='w-4 h-4 accent-green-600 rounded cursor-pointer' />
                            <span className="group-hover:text-green-600 transition-colors">Vehicle Bay</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='furnished' className='w-4 h-4 accent-green-600 rounded cursor-pointer' />
                            <span className="group-hover:text-green-600 transition-colors">Furnished</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider'>Sort Valuation</label>
                    <select 
                        id="sort_order"
                        className='w-full bg-white text-slate-950 font-semibold text-xs uppercase tracking-wider p-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 shadow-sm cursor-pointer appearance-none bg-[url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%2724%27%20height%3D%2724%27%20viewBox%3D%270%200%2024%2024%27%20fill%3D%27none%27%20stroke%3D%27%2316a34a%27%20stroke-width%3D%273%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%3E%3Cpolyline%20points%3D%276%209%2012%2015%2018%209%27%3E%3C%2polyline%3E%3C%2Fsvg%3E")] bg-size-[14px] bg-position-[right_16px_center] bg-no-repeat pr-10'
                    >
                        <option value="regularPrice_desc">Price High to Low</option>
                        <option value="regularPrice_asc">Price Low to High</option>
                        <option value="createdAt_desc">Latest Additions</option>
                        <option value="createdAt_asc">Oldest Records</option>
                    </select>
                </div>

                <button type="submit" className='w-full bg-amber-400 text-white font-black p-4 rounded-xl shadow-md hover:bg-green-600 hover:text-white active:scale-[0.98] transition-all duration-300 text-xs tracking-widest uppercase border-none mt-2'>
                    Initialize Search
                </button>
            </form>
        </div>

        <div className="flex-1 p-7">
            <h1 className="text-3xl font-black text-slate-950 tracking-tight uppercase border-b border-slate-200 pb-4">
                Listing Results
            </h1>
        </div>
   </div>
  )
}