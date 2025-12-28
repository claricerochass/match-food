import React, { useState, useEffect } from "react";

const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#6366F1] via-[#8B5CF6] to-[#F97316]">
      {/* Glassmorphism Container */}
      <div className="w-[85%] aspect-[0.85] glass-card rounded-[3rem] flex flex-col items-center justify-center p-8 relative">
        {/* Burger Image Circle */}
        <div className="relative w-48 h-48 mb-8">
          <div className="w-full h-full rounded-full bg-[#E5E7EB] overflow-hidden border-4 border-white/20">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
              alt="Burger"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Arrow Badge */}
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#F97316"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">
          Match <span className="text-[#F59E0B]">Food</span>
        </h1>
        <p className="text-white/80 text-lg font-medium">
          Seu Tinder de restaurantes
        </p>
      </div>

      {/* Loading Progress */}
      <div className="absolute bottom-16 w-[80%] flex flex-col items-center">
        <div className="flex justify-between w-full mb-2 px-1">
          <span className="text-white/60 text-xs font-bold tracking-widest">
            LOADING
          </span>
          <span className="text-white/60 text-xs font-bold">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
