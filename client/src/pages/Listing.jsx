import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            const res  = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json()

            if(data.success === false){
                setError(true);
                setLoading(false);
              return;  
            }
            setListing(data);
            setLoading(false);
            setError(false)
        };
        
        fetchListing()
    },[params.listingId])

    return (
        <main>
          {loading && <p className='text-center text-3xl my-7'>Loading...</p>}
          {error && <p className='text-center text-3xl my-7'>Something Went Wrong...</p>}
          
          {listing && !error && !loading && (
            <div>
              <Swiper modules={[Navigation]} navigation>
                {listing.imageUrls && listing.imageUrls.map((url) => (
                  <SwiperSlide key={url}>
                    <div 
                      className="h-[500px] w-full bg-center bg-no-repeat" 
                      style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
      
              <h1 className="text-2xl font-bold p-6 text-slate-800">
                {listing.name}
              </h1>
            </div>
          )}
        </main>
      );
    }

export default Listing