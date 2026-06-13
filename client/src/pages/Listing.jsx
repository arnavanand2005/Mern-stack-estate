import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaBed, FaBath, FaCar, FaCouch, FaMapMarkerAlt, FaShieldAlt } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();

                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;  
                }
                setListing(data);
                setLoading(false);
                setError(false);
            } catch (err) {
                setError(true);
                setLoading(false);
            }
        };
        
        fetchListing();
    }, [params.listingId]);

    return (
        <main className="bg-slate-300 min-h-screen pb-16 antialiased text-slate-800 selection:bg-amber-400 selection:text-slate-900">
          
          {loading && (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
              <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"></div>
              <p className='text-slate-600 font-black tracking-wide text-sm animate-pulse'>SOURCING LOS SANTOS PORTFOLIO...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center my-32 bg-white/40 backdrop-blur-md border border-white/40 p-8 rounded-3xl max-w-md mx-auto shadow-2xl">
              <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center mx-auto mb-4 font-black text-xl">!</div>
              <p className='text-slate-950 font-black text-xl mb-1'>GPS LOCATION ERROR</p>
              <p className='text-slate-700 text-sm font-medium'>UNABLE TO MAP PROPERTY RADAR.</p>
            </div>
          )}
          
          {listing && !error && !loading && (
            <div className="max-w-7xl mx-auto md:py-8 px-0 sm:px-4 lg:px-8">
              
              <div className="relative overflow-hidden bg-slate-950 md:rounded-3xl shadow-2xl border-2 border-white group">
                <Swiper 
                  modules={[Navigation, Pagination, Autoplay]} 
                  navigation
                  pagination={{ clickable: true, dynamicBullets: true }}
                  autoplay={{ delay: 4500, disableOnInteraction: false }}
                  className="h-[50vh] md:h-[65vh]"
                >
                  {listing.imageUrls && listing.imageUrls.map((url) => (
                    <SwiperSlide key={url} className="overflow-hidden bg-slate-950">
                      <img 
                        src={url} 
                        alt={listing.name}
                        style={{ imageRendering: '-webkit-optimize-contrast', transform: 'translateZ(0)' }}
                        className="w-full h-full object-cover select-none transition-transform duration-[1500ms] ease-out group-hover:scale-101 brightness-[0.97] contrast-[1.03] saturate-[1.03]"
                        loading="eager"
                        fetchpriority="high"
                        decoding="async"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                
                <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg text-slate-950 backdrop-blur-md border border-white/40 ${
                    listing.type === 'sale' ? 'bg-amber-400/95' : 'bg-emerald-500/95'
                  }`}>
                    LS // FOR {listing.type === 'sale' ? 'SALE' : 'RENT'}
                  </span>
                  
                  {listing.offer && (
                    <span className="bg-slate-950 text-amber-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg shadow-lg border border-amber-400/30 animate-pulse">
                      MARKET DEAL
                    </span>
                  )}
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none z-10" />
              </div>
      
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 px-4 sm:px-0 items-start">
                
                <div className="lg:col-span-2 space-y-6">
                  
                  <div className="bg-white/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/40 shadow-xl space-y-4 hover:border-amber-400/40 transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight leading-tight max-w-xl">
                        {listing.name}
                      </h1>
                      
                      <div className="text-left sm:text-right shrink-0">
                        {listing.offer ? (
                          <div>
                            <span className="text-slate-600 line-through text-xs font-bold block tracking-wider uppercase opacity-75">
                              MSRP: ${listing.regularPrice.toLocaleString()}
                            </span>
                            <span className="text-3xl font-black text-amber-500 tracking-tight block drop-shadow-xs">
                              ${listing.discountedPrice.toLocaleString()}
                              {listing.type === 'rent' && <span className="text-xs font-black text-slate-700 uppercase"> / mo</span>}
                            </span>
                          </div>
                        ) : (
                          <span className="text-3xl font-black text-slate-950 tracking-tight block">
                            ${listing.regularPrice.toLocaleString()}
                            {listing.type === 'rent' && <span className="text-xs font-black text-slate-700 uppercase"> / mo</span>}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-slate-800 text-sm font-bold">
                      <FaMapMarkerAlt className="text-amber-500 w-4 h-4 shrink-0" />
                      <span>{listing.address}</span>
                    </div>

                    {listing.offer && (
                      <div className="bg-amber-400 text-slate-950 p-4 rounded-xl flex items-center justify-between text-xs font-black uppercase tracking-wider shadow-md">
                        <span>LOS SANTOS PRICE CUT SAVINGS:</span>
                        <span className="bg-slate-950 text-amber-400 px-3 py-1 rounded-md text-sm font-black shadow-inner">
                          -${(+listing.regularPrice - +listing.discountedPrice).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center group hover:animate-jiggle cursor-pointer transition-all duration-300 hover:border-green-500">
                    <FaBed className="text-green-500 text-xl mb-2 transition-transform group-hover:scale-110" />
                    <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-0.5">Architecture</span>
                    <span className="text-slate-950 font-black text-sm">{listing.bedrooms} Beds</span>
                </div>

                    <div className="bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center group hover:animate-jiggle cursor-pointer hover:border-amber-400/60 transition-all duration-300">
                      <FaBath className="text-amber-500 text-xl mb-2 transition-transform group-hover:scale-110" />
                      <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-0.5">Restrooms</span>
                      <span className="text-slate-950 font-black text-sm">{listing.bathrooms} Baths</span>
                    </div>

                <div className="bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center group hover:animate-jiggle cursor-pointer transition-all duration-300 hover:border-green-500">
                    <FaCar className={`text-xl mb-2 transition-transform group-hover:scale-110 ${listing.parking ? 'text-green-500' : 'text-slate-500/40'}`} />
                    <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-0.5">Vehicle Bay</span>
                    <span className={`font-black text-sm uppercase ${listing.parking ? 'text-slate-950' : 'text-slate-500/60'}`}>
                        {listing.parking ? 'Garage' : 'None'}
                    </span>
                    </div>      

                    <div className="bg-white/40 backdrop-blur-md border border-white/40 p-4 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center group hover:animate-jiggle cursor-pointer hover:border-amber-400/60 transition-all duration-300">
                      <FaCouch className={`text-xl mb-2 transition-transform group-hover:scale-110 ${listing.furnished ? 'text-amber-500' : 'text-slate-500/40'}`} />
                      <span className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-0.5">Interior</span>
                      <span className={`font-black text-sm uppercase ${listing.furnished ? 'text-slate-950' : 'text-slate-500/60'}`}>
                        {listing.furnished ? 'Furnished' : 'Bare'}
                      </span>
                    </div>
                  </div>

                  <div className="bg-white/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/40 shadow-xl space-y-3">
                    <h3 className="text-xs font-black text-slate-700 uppercase tracking-widest border-b border-slate-400/20 pb-2">Property Overview</h3>
                    <p className="text-slate-950 leading-relaxed font-bold whitespace-pre-line text-sm sm:text-base">
                      {listing.description || "No custom specification narrative provided for this development asset."}
                    </p>
                  </div>

                </div>

                <div className="lg:sticky lg:top-6 space-y-4 w-full">
                  <div className="bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-xl space-y-4 text-center group hover:border-amber-400/40 transition-colors duration-300">
                    <div className="w-12 h-12 bg-amber-400 text-slate-950 rounded-2xl flex items-center justify-center mx-auto border border-white/60 shadow-md group-hover:rotate-12 transition-transform duration-300">
                      <FaShieldAlt className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-950 text-sm uppercase tracking-wider">Vetted LS Portfolio</h4>
                      <p className="text-[11px] text-slate-700 mt-1 px-2 font-bold uppercase tracking-tight opacity-80">Verified Asset Credentials Secured.</p>
                    </div>
                    <hr className="border-white/20 my-2" />
                    
                    <button className="w-full bg-slate-950 text-amber-400 font-black p-4 rounded-xl shadow-lg hover:bg-amber-400 hover:text-slate-950 active:scale-[0.97] transition-all duration-300 text-xs tracking-widest uppercase border border-slate-900">
                      Request Listing Terms
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}
        </main>
    );
}

export default Listing;