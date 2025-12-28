import React from "react";

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="relative h-full w-full bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Floating Food Icons (Mocking Pins from Image 2) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[10%] drop-shadow-md">📍🍔</div>
        <div className="absolute top-[20%] right-[15%] drop-shadow-md">
          📍🍕
        </div>
        <div className="absolute bottom-[20%] left-[15%] drop-shadow-md">
          📍🍣
        </div>
        <div className="absolute bottom-[10%] right-[10%] drop-shadow-md">
          📍🥗
        </div>
        <div className="absolute top-1/2 left-[-5%] drop-shadow-md">📍🌮</div>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-sm glass-card rounded-[3rem] p-10 flex flex-col items-center text-center z-10 bg-white/40 shadow-2xl">
        {/* Pin Icon */}
        <div className="w-20 h-20 bg-[#FEE2E2] rounded-full flex items-center justify-center mb-8 shadow-inner">
          <div className="w-10 h-10 bg-[#F97316] rounded-full flex items-center justify-center text-white">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-[#1F2937] leading-tight mb-4">
          Seu Tinder de <br />
          <span className="text-[#F97316]">restaurantes</span>
        </h1>

        <p className="text-[#4B5563] text-sm mb-12 px-2">
          Descubra o sabor da sua cidade com um simples swipe. Onde vamos comer
          hoje?
        </p>

        {/* Google Login Button */}
        <button
          onClick={onLogin}
          className="w-full bg-white border border-gray-200 rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-[#374151] font-bold">Entrar com Google</span>
        </button>

        <p className="mt-8 text-[10px] text-gray-400">
          Ao entrar, você concorda com nossos <br />
          <span className="underline cursor-pointer">Termos</span> e{" "}
          <span className="underline cursor-pointer">
            Política de Privacidade
          </span>
          .
        </p>
      </div>

      {/* Bottom Bar Indicator (iOS style) */}
      <div className="absolute bottom-2 w-32 h-1 bg-gray-200 rounded-full"></div>
    </div>
  );
};

export default LoginScreen;
