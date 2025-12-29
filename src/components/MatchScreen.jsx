import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Navigation,
  Smartphone,
  ArrowRight,
  Star,
} from "lucide-react";

import Confetti from "react-confetti";

function MatchScreen({ restaurant, onClose, onNext }) {
  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Acabei de dar match no ${restaurant.name}! 🍽️`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  const handleGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/search/${encodeURIComponent(
        restaurant.name
      )}`,
      "_blank"
    );
  };

  const handleDelivery = () => {
    // Simular abertura de delivery
    console.log("Opening delivery...");
  };

  return (
    <motion.div
      className="match-screen"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
    >
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={500}
        gravity={0.15}
      />

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm mx-auto z-10">
        {/* Animated Heart Circle */}
        <motion.div
          className="match-heart-circle"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <HeartIcon />
          <div className="match-pulse-ring"></div>
        </motion.div>

        <motion.h1
          className="match-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          MATCH
          <br />
          PERFEITO!
        </motion.h1>

        <motion.p
          className="match-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Parabéns! Esse restaurante
          <br />
          combina com sua fome.
        </motion.p>

        {/* Restaurant Card Preview */}
        <motion.div
          className="match-restaurant-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="match-card-image">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="match-food-image"
            />
          </div>

          <div className="match-card-info">
            <div className="flex justify-between items-center mb-1">
              <h2 className="match-restaurant-name">{restaurant.name}</h2>
              <div className="match-rating">
                <Star size={14} fill="currentColor" strokeWidth={0} />
                <span>{restaurant.rating}</span>
              </div>
            </div>

            <div className="match-restaurant-meta">
              <span className="match-distance">{restaurant.distance}</span>
              <span className="match-meta-dot">•</span>
              <span>10-20 min</span>
            </div>

            <div className="match-suggested-dish">
              Prato sugerido: <strong>R$35</strong>
            </div>
          </div>
        </motion.div>

        {/* Main CTA */}
        <motion.button
          className="match-whatsapp-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          onClick={handleWhatsApp}
        >
          <MessageCircle size={24} fill="currentColor" />
          Enviar p/ WhatsApp
        </motion.button>

        {/* Action Buttons Row */}
        <motion.div
          className="match-action-buttons"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button className="match-action-btn" onClick={handleGoogleMaps}>
            <Navigation size={20} />
            ABRIR MAPS
          </button>

          <button className="match-action-btn">
            <Smartphone size={20} />
            DELIVERY
          </button>

          <button className="match-action-btn" onClick={onNext}>
            <div className="rotate-180 transform">
              {/* Arrow icon logic could be simpler but keeping structure */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </div>
            PRÓXIMO
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Icon component para simplificar
const HeartIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default MatchScreen;
