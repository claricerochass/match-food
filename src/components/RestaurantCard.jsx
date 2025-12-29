import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Star, MapPin, TrendingUp } from "lucide-react";

function RestaurantCard({ restaurant, onSwipe, isTop }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) {
      onSwipe("right", restaurant);
    } else if (info.offset.x < -100) {
      onSwipe("left", restaurant);
    }
  };

  return (
    <motion.div
      className="restaurant-card"
      style={{
        x,
        rotate,
        opacity,
        zIndex: isTop ? 10 : 0,
      }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{
        x: x.get() === 0 ? 0 : x.get() > 0 ? 500 : -500,
        opacity: 0,
        scale: 0.5,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Image */}
      <div className="restaurant-image-container">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="restaurant-image"
        />
        {/* Gradient Overlay */}
        <div className="card-gradient-overlay"></div>
      </div>

      {/* Distance Badge (Top Left) */}
      <div className="distance-badge">
        <MapPin size={14} className="distance-icon" />
        <span className="distance-text">{restaurant.distance}</span>
      </div>

      {/* Trending Badge (Top Right) */}
      <div className="trending-badge">
        <TrendingUp size={14} />
        <span className="trending-text">Trending</span>
      </div>

      {/* Glass Info Overlay (Bottom) */}
      <div className="restaurant-info-glass">
        <div className="info-header">
          <div className="info-left">
            <h2 className="restaurant-name">{restaurant.name}</h2>
            <p className="restaurant-cuisine">{restaurant.cuisine}</p>
          </div>
          <div className="info-right">
            <div className="rating-container">
              <Star size={16} className="star-icon" fill="currentColor" />
              <span className="rating-value">{restaurant.rating}</span>
            </div>
            <span className="reviews-count">(1.2k reviews)</span>
          </div>
        </div>

        {/* Tags/Chips */}
        <div className="restaurant-tags">
          {restaurant.tags.map((tag, index) => (
            <span key={index} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;
