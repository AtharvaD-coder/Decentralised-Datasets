'use client'

import { ArrowUpCircle, Search, Database } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  
  const router = useRouter();

  const handleUploadClick = () => {
    console.log("clicked upload!");
    router.push('/upload');
  };

  const handleSearch = () =>{
    console.log("clicked search!");
    router.push('/datasets');
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">



      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 border border-purple-500 rounded"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: '60px',
              height: '60px',
              transform: 'rotate(45deg)',
              animation: `float ${5 + Math.random() * 10}s infinite linear`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">

        <div className="flex justify-center mb-6">
          <Database className="w-16 h-16 text-purple-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Decentralised Datasets
        </h1>
        
        <p className="text-lg md:text-xl text-purple-200 mb-12 font-light">
        Upload, Validate, and Discover High-Quality Datasets – with Trust, Transparency, and Decentralized Security
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">

          <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]" onClick={handleUploadClick}>
            <ArrowUpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Upload Dataset</span>
          </button>
          
          <button className="group flex items-center justify-center gap-2 bg-transparent text-purple-400 border border-purple-500 px-8 py-3 rounded-lg transition-all duration-300 hover:bg-purple-500/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
          onClick={handleSearch}>
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Search Dataset</span>
          </button>
        </div>
      </div>
    </div>
  );
}