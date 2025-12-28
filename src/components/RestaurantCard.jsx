import React from "react";
import { Star, MapPin, TrendingUp } from "lucide-react";

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
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
    </div>
  );
}

export default RestaurantCard;
