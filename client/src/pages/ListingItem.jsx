import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingItem({ listing }) {
  return (
    <div className='bg-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl w-full sm:w-82.5 md:w-70 border border-slate-300 hover:border-amber-400 group flex flex-col'>
       <Link to={`/listing/${listing._id}`} className="flex flex-col h-full">
            <div className="overflow-hidden relative shrink-0">
                <img
                 src={listing.imageUrls[0] || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"} 
                 alt="listing-image" 
                 className='h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-[9px] font-black tracking-widest text-amber-400 px-2 py-1 rounded uppercase">
                    SYS_REC // {listing.type}
                </div>
            </div>

            <div className='p-4 flex flex-col gap-2 flex-1 justify-between'>
                <div className="space-y-2">
                    <p className='text-md font-black text-slate-900 tracking-wide uppercase truncate group-hover:text-green-700 transition-colors duration-200'>
                        {listing.name}
                    </p>
                    
                    <div className='flex items-center gap-1 bg-white/50 p-1.5 rounded-lg border border-slate-300/60'>
                        <MdLocationOn className='text-green-700 h-4 w-4 shrink-0'/>
                        <p className='text-xs font-bold text-slate-700 truncate w-full tracking-tight'>
                            {listing.address}
                        </p>
                    </div>

                    <p className='text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed min-h-8'>
                        {listing.description}
                    </p>
                </div>

                <div className="space-y-2 mt-2">
                    <p className='text-slate-950 font-black text-base tracking-tight bg-amber-400 border border-amber-500/30 py-1.5 px-2.5 rounded-lg w-fit shadow-sm'>
                        $
                        {listing.offer 
                          ? (listing.discountedPrice ?? 0).toLocaleString('en-US')
                          : (listing.regularPrice ?? 0).toLocaleString('en-US')}
                        {listing.type === 'rent' && <span className="text-slate-800 text-xs font-bold tracking-normal"> / mo</span>}
                    </p>

                    <div className='text-[10px] text-slate-700 flex gap-2 font-black uppercase tracking-widest pt-2 border-t border-slate-300/60'>
                        <div className='bg-white/80 px-2 py-1 rounded border border-slate-300 flex items-center gap-1'>
                            <span className="text-green-700">✓</span> {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                        </div>
                        <div className='bg-white/80 px-2 py-1 rounded border border-slate-300 flex items-center gap-1'>
                            <span className="text-green-700">✓</span> {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
                        </div>
                    </div>
                </div>
            </div>
       </Link>
    </div>
  )
}