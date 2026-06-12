import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            const res  = await fetch(`/api/listing/get/${params.listingId}`);
            const data = await res.json()

            if(data.success === false){
                setLoading(false);
                setError(true);
              return;  
            }
            setListing(data)
        };;

        
        fetchListing()
    })
  return (
   <div>
    {listing && listing.name}
   </div>
  )
}

export default Listing
