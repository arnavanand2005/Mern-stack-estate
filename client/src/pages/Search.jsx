import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'; 
import ListingItem from './ListingItem';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation(); 

    const [showMore, setShowMore] = useState(false)

    const [sidebardata, setSidebardata] = useState({
        searchTerm : '',
        type : 'all',
        parking : false,
        furnished : false,
        offer : false,
        sort : 'createdAt',
        order : 'desc'
    })

    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished')
        const offerFromUrl = urlParams.get('offer')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')

        if(searchTermFromUrl || 
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm : searchTermFromUrl || "",
                type : typeFromUrl || 'all',
                parking : parkingFromUrl === 'true' ? true : false,
                furnished : furnishedFromUrl === 'true' ? true : false,
                offer : offerFromUrl === 'true' ? true : false,
                sort : sortFromUrl || 'createdAt',
                order : orderFromUrl || 'desc'
            });
        }

        const fetchListings = async () => {
            try {
                setLoading(true);
                const searchQuery = urlParams.toString();
                console.log("📡 Asset Radar sending query to backend:", searchQuery); 
                
                const res = await fetch(`/api/listing/get?${searchQuery}`);
                
                if (!res.ok) {
                    console.error(`❌ Backend responded with status: ${res.status}`);
                    setLoading(false);
                    return;
                }
    
                const data = await res.json();
                console.log("🎯 RAW DATA RECEIVED FROM YOUR BACKEND:", data); 
                if(data.length > 8){
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
                setListings(data);
                setLoading(false);
            } catch (error) {
                console.error("🚨 Fetch network connection broke down entirely:", error);
                setLoading(false);
            }
        };

        fetchListings();
    }, [location.search]); 

    console.log(sidebardata);
    
    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'sale' || e.target.id === 'rent' ){
            setSidebardata({...sidebardata, type : e.target.id})
        }

        if (e.target.id === 'searchTerm' ){
            setSidebardata({...sidebardata, searchTerm : e.target.value})
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({...sidebardata,
                [e.target.id] : e.target.checked
            }) 
        }

        if(e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'createdAt'
            const order = e.target.value.split('_')[1] || 'desc'

            setSidebardata({...sidebardata, sort, order })
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams  = new URLSearchParams()
        urlParams.set('searchTerm', sidebardata.searchTerm)
        urlParams.set('parking', sidebardata.parking)
        urlParams.set('type', sidebardata.type)
        urlParams.set('furnished', sidebardata.furnished)
        urlParams.set('offer', sidebardata.offer)
        urlParams.set('sort', sidebardata.sort)
        urlParams.set('order', sidebardata.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const onShowMoreClick = async () => {
         const numberOfListings = listings.length;
         const startIndex = numberOfListings;
         const urlParams = new URLSearchParams(location.search);
         urlParams.set('startIndex', startIndex)
         const searchQuery = urlParams.toString()
         const res = await fetch(`/api/listing/get?${searchQuery}`)
         const data = await res.json()
         if(data.length < 9){
             setShowMore(false)
         }
         setListings([...listings,...data])
    }

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

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider'>Search Term</label>
                    <input 
                        type="text" 
                        value={sidebardata.searchTerm}
                        onChange={handleChange}
                        placeholder='Specify coordinate or name...'
                        id='searchTerm'
                        className='p-3 bg-white text-slate-950 placeholder:text-slate-400 text-sm font-semibold rounded-xl border border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 focus:bg-white outline-none transition-all duration-300 shadow-inner'
                    />
                </div>

                <div className='space-y-2.5'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider block'>Listing Type</label>
                    <div className='grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 uppercase tracking-tight'>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-amber-400 transition-all duration-200 cursor-pointer group'>
                            <input
                             type="checkbox" id='all' className='w-4 h-4 accent-amber-500 rounded cursor-pointer'
                             onChange={handleChange}
                             checked={sidebardata.type === 'all'} />
                            <span className="group-hover:text-amber-500 transition-colors">Rent & Sale</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='rent' className='w-4 h-4 accent-green-600 rounded cursor-pointer' onChange={handleChange} checked={sidebardata.type === 'rent'} />
                            <span className="group-hover:text-green-600 transition-colors">Rent</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='sale' className='w-4 h-4 accent-green-600 rounded cursor-pointer' onChange={handleChange} checked={sidebardata.type === 'sale'} />
                            <span className="group-hover:text-green-600 transition-colors">Sale</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-amber-400 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='offer' className='w-4 h-4 accent-amber-500 rounded cursor-pointer' onChange={handleChange} checked={sidebardata.offer} />
                            <span className="group-hover:text-amber-500 transition-colors">Offer</span>
                        </div>
                    </div>
                </div>

                <div className='space-y-2.5'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider block'>Asset Amenities</label>
                    <div className='grid grid-cols-2 gap-2 text-xs font-bold text-slate-800 uppercase tracking-tight'>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='parking' className='w-4 h-4 accent-green-600 rounded cursor-pointer' onChange={handleChange} checked={sidebardata.parking} />
                            <span className="group-hover:text-green-600 transition-colors">Vehicle Bay</span>
                        </div>
                        <div className='flex items-center gap-2.5 bg-white/60 border border-slate-300 px-3 py-2.5 rounded-xl hover:bg-white hover:border-green-500 transition-all duration-200 cursor-pointer group'>
                            <input type="checkbox" id='furnished' className='w-4 h-4 accent-green-600 rounded cursor-pointer' checked={sidebardata.furnished} onChange={handleChange}/>
                            <span className="group-hover:text-green-600 transition-colors">Furnished</span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='text-[10px] font-black text-slate-700 uppercase tracking-wider'>Sort Valuation</label>
                    <select 
                        id="sort_order"
                        className='w-full bg-white text-slate-950 font-semibold text-xs uppercase tracking-wider p-3 rounded-xl border border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all duration-300 shadow-sm cursor-pointer'
                        onChange={handleChange}
                        defaultValue='createdAt_desc'
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

        <div className="flex-1 p-7 space-y-6 bg-slate-100 flex flex-col justify-between">
            <div className="space-y-6">
                <h1 className="text-3xl font-black text-slate-950 tracking-tight uppercase border-b border-slate-200 pb-4">
                    Listing Results
                </h1>
                <div className="flex flex-wrap gap-4 justify-start items-start">
                    {loading && (
                        <p className="text-xl text-slate-700 font-bold w-full text-center py-10 animate-pulse">
                            Scanning Channels...
                        </p>
                    )}
                    {!loading && listings.length === 0 && (
                        <p className="text-xl text-slate-600 font-semibold w-full text-center py-10">
                            No listings found!
                        </p>
                    )}
                    {!loading && listings && listings.map((listing) => (
                        <ListingItem key={listing._id} listing={listing}/>
                    ))}
                </div>
            </div>

            {showMore && (
                <div className="w-full flex justify-center pt-8">
                    <button 
                        onClick={onShowMoreClick}
                        className='bg-slate-200 hover:bg-green-700 text-slate-800 hover:text-white border border-slate-300 hover:border-green-700 text-xs font-black tracking-widest uppercase py-3.5 px-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 text-center'
                    >
                        Load More Records
                    </button>
                </div>
            )}
        </div>
   </div>
  )
}