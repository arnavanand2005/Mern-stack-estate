import LineWaves from './LineWaves'; 
import { FaGithub, FaLinkedin, FaFolderOpen } from 'react-icons/fa';
import developerAvatar from '../assets/image.png'; 

export default function About() {
  
  const developers = [
    {
      name: "Arnav Anand",
      role: "Lead Systems Architect & Full Stack Developer",
      bio: "Full-stack engineer managing the pipeline architectures, WebGL interaction layers, database tracking parameters, and UI design matrix behind Los Santos Estates.",
      avatar: developerAvatar,
      github: "https://github.com/arnavanand2005", 
      linkedin: "https://www.linkedin.com/in/arnav-anand-056710315/", 
      portfolio: "https://github.com/arnavanand2005?tab=repositories" 
    }
  ];

  return (
    <div className='flex flex-col min-h-screen bg-slate-100 font-sans antialiased selection:bg-amber-400 selection:text-slate-900 relative overflow-hidden'>
      
      <div className='absolute top-0 left-0 w-full h-125 pointer-events-none opacity-70 z-0'>
        <LineWaves
          speed={0.5}
          innerLineCount={35}       
          outerLineCount={45}      
          rotation={-25}
          edgeFadeWidth={0.1}
          colorCycleSpeed={0.6}
          brightness={0.5}        
          color1="#22c55e"          
          color2="#eab308"         
          color3="#16a34a"          
          enableMouseInteraction={true}
          mouseInfluence={2.5}      
        />
        <div className='absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-slate-100 via-slate-100/80 to-transparent' />
      </div>

      <div className='max-w-4xl mx-auto px-4 py-20 relative z-10 flex flex-col gap-16 text-center sm:text-left'>
        
        <div className='space-y-2 text-center'>
          <span className='text-[10px] font-black tracking-widest text-green-600 uppercase bg-green-600/10 px-3 py-1 rounded-full border border-green-600/20'>
            System Manifest // Documentation
          </span>
          <h1 className='text-slate-700 text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none mt-3'>
            About <span className='text-gray-400'>Los Santos</span> Estates
          </h1>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-start'>
          
          <div className='bg-slate-200 border border-slate-300 shadow-xl rounded-2xl p-6 sm:p-8 space-y-4 hover:border-amber-400 transition-colors duration-300 h-full text-left'>
            <div className='flex items-center gap-2 border-b border-slate-300/60 pb-3'>
              <div className='w-2 h-2 rounded-full bg-amber-400 animate-pulse' />
              <h2 className='text-sm font-black uppercase tracking-wider text-slate-800'>The Asset Matrix</h2>
            </div>
            <p className='text-slate-600 text-sm font-medium leading-relaxed'>
              Los Santos Estates runs as a high-fidelity indexing grid designed to map every residential and commercial property tier across the state of San Andreas. We remove the clutter from searching for real estate by organizing entries into a clean, unified dataset.
            </p>
          </div>

          <div className='bg-slate-200 border border-slate-300 shadow-xl rounded-2xl p-6 sm:p-8 space-y-4 hover:border-green-500 transition-colors duration-300 h-full text-left'>
            <div className='flex items-center gap-2 border-b border-slate-300/60 pb-3'>
              <div className='w-2 h-2 rounded-full bg-green-500' />
              <h2 className='text-sm font-black uppercase tracking-wider text-slate-800'>Inclusive Indexing</h2>
            </div>
            <p className='text-slate-600 text-sm font-medium leading-relaxed'>
              We believe a database should cover all spectrums of the market. Our tracking framework handles everything equally—ranging from budget-friendly spaces in Pillbox Hill, suburban residential options throughout Vinewood, all the way up to premium luxury compounds hidden in Rockford Hills.
            </p>
          </div>

        </div>

        <div className='space-y-6 pt-6'>
          <div className='border-b border-slate-300 pb-2 flex justify-between items-end'>
            <h2 className='text-xl font-black text-slate-800 uppercase tracking-tight'>Engineering Core</h2>
            <span className='text-[10px] text-slate-500 font-bold uppercase tracking-widest'>[AUTHOR_LOGS]</span>
          </div>

          <div className='grid grid-cols-1 gap-6 w-full'>
            {developers.map((dev, idx) => (
              <div key={idx} className='bg-slate-200 border border-slate-300 shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left hover:border-amber-400 transition-all duration-300 group relative overflow-hidden'>
                
                <div className='w-28 h-28 rounded-xl overflow-hidden border-2 border-slate-300 group-hover:border-amber-400 transition-colors shrink-0 bg-slate-300 shadow-inner relative z-10'>
                  <img 
                    src={dev.avatar} 
                    alt={dev.name} 
                    className='w-full h-full object-cover contrast-125 brightness-95 transition-all duration-500' 
                  />
                </div>

                <div className='space-y-2 flex-1 relative z-10'>
                  <div>
                    <h3 className='text-slate-800 font-black uppercase text-lg tracking-tight'>{dev.name}</h3>
                    <p className='text-green-600 text-xs font-bold uppercase tracking-wider'>{dev.role}</p>
                  </div>
                  <p className='text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl'>
                    {dev.bio}
                  </p>

                  <div className='flex items-center gap-4 justify-center sm:justify-start pt-2'>
                    <a href={dev.github} target="_blank" rel="noreferrer" className='text-slate-500 hover:text-slate-800 text-xl transition-colors' title="GitHub Repository Hub">
                      <FaGithub />
                    </a>
                    <a href={dev.linkedin} target="_blank" rel="noreferrer" className='text-slate-500 hover:text-blue-600 text-xl transition-colors' title="LinkedIn Network Portal">
                      <FaLinkedin />
                    </a>
                    <a href={dev.portfolio} target="_blank" rel="noreferrer" className='text-slate-500 hover:text-amber-500 text-xl transition-colors' title="Rebuild Project Vector">
                      <FaFolderOpen />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className='bg-slate-200/60 border border-slate-300/80 rounded-2xl p-6 text-center space-y-3 max-w-2xl mx-auto w-full'>
          <h3 className='text-xs font-black uppercase tracking-widest text-slate-700'>
            Current Operational Parameters
          </h3>
          <div className='flex flex-wrap justify-center gap-4 sm:gap-8 text-[11px] font-bold text-slate-500 uppercase tracking-tight'>
            <div className='flex items-center gap-1.5'>
              <span className='text-green-600'>✓</span> Real-Time Filters
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='text-green-600'>✓</span> Multi-Vehicle Bay Logs
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='text-green-600'>✓</span> Parallel Database Feeds
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}