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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Gradient */}
      <div className="match-gradient-bg"></div>

      {/* Content Container */}
      <div className="match-content">
        {/* Animated Heart Icon */}
        <motion.div
          className="match-heart-circle"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Heart size={48} fill="white" strokeWidth={0} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="match-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          MATCH
          <br />
          PERFEITO!
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="match-subtitle"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Parabéns! Esse restaurante combina com sua fome.
        </motion.p>

        {/* Restaurant Card */}
        <motion.div
          className="match-restaurant-card"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="match-card-image">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="match-food-image"
            />
          </div>
          <div className="match-card-info">
            <h3 className="match-restaurant-name">{restaurant.name}</h3>
            <div className="match-restaurant-meta">
              <div className="match-rating">
                <Star size={14} fill="#f97316" stroke="#f97316" />
                <span>{restaurant.rating}</span>
              </div>
              <span className="match-meta-dot">•</span>
              <span className="match-distance">{restaurant.distance}</span>
            </div>
            <p className="match-suggested-dish">
              Prato sugerido: <strong>R$35</strong>
            </p>
          </div>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.button
          className="match-whatsapp-btn"
          onClick={handleWhatsApp}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle size={22} fill="currentColor" strokeWidth={0} />
          <span>Enviar p/ WhatsApp</span>
        </motion.button>

        {/* Action Buttons */}
        <motion.div
          className="match-action-buttons"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="match-action-btn" onClick={handleGoogleMaps}>
            <Navigation size={20} />
            <span>GOOGLE MAPS</span>
          </button>

          <button className="match-action-btn" onClick={handleDelivery}>
            <Smartphone size={20} />
            <span>DELIVERY</span>
          </button>

          <button className="match-action-btn" onClick={onNext}>
            <ArrowRight size={20} />
            <span>PRÓXIMO</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MatchScreen;
