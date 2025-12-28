import React from "react";
import { motion } from "framer-motion";
import { Send, Map as MapIcon, ShoppingBag, MessageSquare } from "lucide-react";

const MatchModal = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-xl flex items-center justify-center p-6"
    >
      <div className="w-full max-w-sm glass rounded-[3rem] p-10 flex flex-col items-center text-center text-white border-white/30">
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-4xl font-black mb-2 tracking-tight">
          MATCH PERFEITO!
        </h2>
        <p className="text-white/80 mb-8 font-medium italic">
          "A gente se fala pelo estômago"
        </p>

        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#F97316] mb-8 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"
            alt="Match"
            className="w-full h-full object-cover"
          />
        </div>

        <button className="w-full bg-[#F97316] text-white rounded-full py-5 px-8 font-black text-lg flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(249,115,22,0.4)] mb-6 active:scale-95 transition-all">
          <Send size={24} />
          ENVIAR MAPA WHATSAPP
        </button>

        <div className="flex gap-4 w-full">
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <MapIcon size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              Maps
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShoppingBag size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              Delivery
            </span>
          </div>
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              Chat
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-12 text-sm font-bold text-white/40 hover:text-white transition-colors"
        >
          CONTINUAR SWIPANDO
        </button>
      </div>
    </motion.div>
  );
};

export default MatchModal;
