import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState(''); 

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLandlord();
    }, [listing.userRef]);

    return (
        <>
            {landlord && (
                <div className='bg-white/40 backdrop-blur-md p-6 rounded-3xl border border-white/40 shadow-xl space-y-4 hover:border-emerald-500/30 transition-colors duration-300 text-left mt-4 group/contact'>
                    
                    <div className='space-y-1'>
                        <h4 className='text-xs font-black text-slate-700 uppercase tracking-widest border-b border-slate-400/20 pb-2 flex items-center justify-between'>
                            <span>Secure Asset Channel</span>
                            <span className='text-[9px] bg-emerald-500/20 text-emerald-700 px-2 py-0.5 rounded-md font-black tracking-normal'>
                                ONLINE
                            </span>
                        </h4>
                        <p className='text-xs font-bold text-slate-800 uppercase tracking-tight pt-1'>
                            Contact Manager:{' '}
                            <span className='text-slate-950 font-black normal-case'>{landlord.username || landlord.email}</span>
                        </p>
                        <p className='text-[11px] font-bold text-slate-600 uppercase tracking-wider'>
                            Regarding:{' '}
                            <span className='text-amber-600 font-black'>{listing.name}</span>
                        </p>
                    </div>

                    <div className='relative'>
                        <textarea
                            name="message"
                            id="message"
                            rows='3'
                            value={message}
                            onChange={onChange} 
                            placeholder='Formulate secure transaction requirements or negotiation proposals...'
                            className='w-full bg-slate-950/5 text-slate-950 font-medium placeholder:text-slate-500 text-sm p-4 rounded-2xl border border-slate-950/10 focus:border-emerald-500/50 focus:bg-white/60 focus:ring-2 focus:ring-emerald-500/10 outline-none transition-all duration-300 resize-none'
                        />
                    </div>

                    <Link 
                        to={`mailto:${landlord.email}?subject=Regarding Asset: ${listing.name}&body=${encodeURIComponent(message)}`}
                        className='w-full flex items-center justify-center bg-slate-950 text-amber-400 font-black p-4 rounded-xl shadow-lg hover:bg-emerald-500 hover:text-white active:scale-[0.97] transition-all duration-300 text-xs tracking-widest uppercase border border-slate-900 group-hover/contact:shadow-emerald-500/5'
                    >
                        Dispatch Encrypted Message
                    </Link>
                    
                </div>
            )}
        </>
    );
}