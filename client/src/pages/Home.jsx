import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListingItem from './ListingItem';
import LineWaves from './LineWaves'; 
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styling sets
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        setLoading(true);
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch('/api/listing/get?offer=true&limit=4'),
          fetch('/api/listing/get?type=rent&limit=4'),
          fetch('/api/listing/get?type=sale&limit=4')
        ]);

        const offerData = await offerRes.json();
        const rentData = await rentRes.json();
        const saleData = await saleRes.json();

        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
      } catch (error) {
        console.error("🚨 Radar link failed to aggregate listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-900 relative overflow-hidden'>
      
      {/* 📡 LineWaves Layer */}
      <div className='absolute top-0 left-0 w-full h-[650px] pointer-events-none opacity-80 z-0'>
        <LineWaves
          speed={0.6}
          innerLineCount={45}       
          outerLineCount={55}      
          rotation={-35}
          edgeFadeWidth={0.05}
          colorCycleSpeed={0.8}
          brightness={0.65}        
          color1="#22c55e"          
          color2="#eab308"         
          color3="#16a34a"          
          enableMouseInteraction={true}
          mouseInfluence={3.0}      
        />
        <div className='absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-100 via-slate-100/80 to-transparent' />
      </div>     

      {/* Hero Header Area */}
      <div className='max-w-6xl mx-auto px-4 py-20 flex flex-col gap-8 items-center text-center relative z-10'>
        <div className='space-y-2 animate-[bounce_3s_infinite] [animation-timing-function:ease-in-out]'>
          <h1 className='text-slate-700 text-4xl sm:text-6xl font-bold uppercase tracking-tight leading-none'>
            Find Your Next <span className='text-gray-400'>Perfect</span>
          </h1> 
          <h1 className='text-slate-700 text-4xl sm:text-6xl font-bold uppercase tracking-tight leading-none'>
            Place To Live
          </h1>
        </div>

        <p className='text-slate-500 text-sm sm:text-base font-medium leading-relaxed max-w-2xl'>
          Welcome to <span className="font-semibold text-slate-700">Los Santos Estates</span>—the ultimate tracking hub for every property tier across San Andreas. Whether you're scanning for an affordable apartment space downtown, a mid-tier family residential home, or an expansive executive compound, our asset radar covers it all. Initialize your search parameters, filter by your required vehicle bays, and map out your next move.
        </p>

        <div className="mt-4">
          <Link 
            to={'/search'}
            className='pointer-events-auto inline-block bg-amber-400 hover:bg-green-600 text-slate-950 hover:text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-green-600/10 active:scale-[0.97] transition-all duration-300'
          >
           Lets Get Started...
          </Link>
        </div>
      </div>

      {offerListings && offerListings.length > 0 && (
        <div className='w-full max-w-6xl mx-auto px-4 relative z-10 mb-8'>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className='h-[400px] rounded-2xl overflow-hidden shadow-xl border border-slate-200'
          >
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div 
                  style={{ background: `url(${listing.imageUrls?.[0]}) center no-repeat`, backgroundSize: 'cover' }}
                  className='h-full w-full flex items-end p-8 bg-slate-900/40 relative'
                >
                  {/* Subtle scrim overlay layer for readability protection */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent z-0" />
                  
                  {/* Text Details Box inside Slide */}
                  <div className="relative z-10 text-left bg-slate-900/70 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 max-w-lg">
                    <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">Strategic Offer</span>
                    <h2 className="text-xl font-black text-white uppercase tracking-tight mt-2 truncate">{listing.name}</h2>
                    <p className="text-slate-300 text-xs font-medium line-clamp-1 mt-1">{listing.address}</p>
                    <Link to={`/listing/${listing._id}`} className="inline-block mt-3 text-xs font-black text-green-400 hover:text-amber-400 uppercase tracking-wider transition-colors">
                      Inspect Record Asset →
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* 📊 Data Grid Outputs inside strict CSS grids */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-12 my-10 w-full text-left relative z-10'>
        {loading ? (
          <p className="text-center font-bold text-slate-600 tracking-wider animate-pulse uppercase text-xs">Synchronizing Asset Feeds...</p>
        ) : (
          <>
            {offerListings && offerListings.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Recent Strategic Offers</h2>
                  <Link className="text-xs font-black uppercase text-green-700 hover:text-amber-500 tracking-wider transition-colors" to='/search?offer=true'>View all offers →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center sm:justify-items-start">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}

            {rentListings && rentListings.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Properties For Rent</h2>
                  <Link className="text-xs font-black uppercase text-green-700 hover:text-amber-500 tracking-wider transition-colors" to='/search?type=rent'>View all rentals →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center sm:justify-items-start">
                  {rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}

            {saleListings && saleListings.length > 0 && (
              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-slate-200 pb-2">
                  <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Properties For Sale</h2>
                  <Link className="text-xs font-black uppercase text-green-700 hover:text-amber-500 tracking-wider transition-colors" to='/search?type=sale'>View all sales →</Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full justify-items-center sm:justify-items-start">
                  {saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}