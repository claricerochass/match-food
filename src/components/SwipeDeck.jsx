import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, Star, Settings, User } from "lucide-react";
import RestaurantCard from "./RestaurantCard";
import BottomNav from "./BottomNav";
import MatchScreen from "./MatchScreen";

const mockRestaurants = [
  {
    id: 1,
    name: "Fogo de Chão",
    cuisine: "Brazilian Steakhouse • $$$",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop",
    rating: 4.8,
    distance: "1.2km",
    tags: ["Rodízio", "Cocktails", "Valet"],
  },
  {
    id: 2,
    name: "Açaí do Futuro",
    cuisine: "Brasileira • Açaí • $$",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&auto=format&fit=crop",
    rating: 4.5,
    distance: "800m",
    tags: ["Brasileira", "Açaí", "Saudável"],
  },
  {
    id: 3,
    name: "Sushi Zen",
    cuisine: "Japanese • Sushi Bar • $$$",
    image:
      "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&auto=format&fit=crop",
    rating: 4.9,
    distance: "1.5km",
    tags: ["Japonesa", "Sushi", "Premium"],
  },
];

function SwipeDeck() {
  const [deck, setDeck] = useState(mockRestaurants);
  const [matchedRestaurant, setMatchedRestaurant] = useState(null);

  const handleSwipe = (direction, restaurant) => {
    console.log(`Swiped ${direction} on ${restaurant.name}`);

    // Se swipe for para direita (like), mostrar tela de match
    if (direction === "right") {
      setMatchedRestaurant(restaurant);
    }

    setDeck((prev) => prev.filter((r) => r.id !== restaurant.id));
  };

  const handleCloseMatch = () => {
    setMatchedRestaurant(null);
  };

  return (
    <div className="swipe-deck">
      {/* Ambient Background Gradient */}
      <div className="ambient-gradient"></div>

      {/* Top Header */}
      <header className="top-header">
        <div className="header-left">
          <div className="user-avatar-container">
            <div className="user-avatar">
              <User size={20} className="avatar-icon" />
            </div>
            <div className="online-indicator"></div>
          </div>
        </div>
        <button className="filter-button">
          <Settings size={20} />
        </button>
      </header>

      {/* Main Card Area */}
      <main className="card-area">
        {/* Background Stack Effect (Depth) */}
        <div className="card-stack-bg"></div>

        {/* Cards Stack */}
        <AnimatePresence>
          {deck.map((restaurant, index) => {
            const isTop = index === deck.length - 1;
            return (
              <motion.div
                key={restaurant.id}
                style={{
                  zIndex: index,
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                }}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x > 100) handleSwipe("right", restaurant);
                  else if (offset.x < -100) handleSwipe("left", restaurant);
                }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale: isTop ? 1 : 0.95 - index * 0.02,
                  opacity: 1,
                  y: isTop ? 0 : -(deck.length - index - 1) * 8,
                }}
                exit={{ x: 1000, opacity: 0, transition: { duration: 0.3 } }}
                transition={{ duration: 0.3 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </main>

      {/* Reaction Floating Buttons */}
      <div className="reaction-buttons">
        {/* Pass Button */}
        <button
          className="reaction-btn pass-btn"
          onClick={() =>
            deck.length > 0 && handleSwipe("left", deck[deck.length - 1])
          }
        >
          <X size={28} strokeWidth={2.5} />
        </button>

        {/* Super Like Button (Elevated) */}
        <button className="reaction-btn super-like-btn">
          <Star size={20} fill="currentColor" strokeWidth={1.5} />
        </button>

        {/* Like Button (Primary) */}
        <button
          className="reaction-btn like-btn"
          onClick={() =>
            deck.length > 0 && handleSwipe("right", deck[deck.length - 1])
          }
        >
          <Heart size={32} fill="currentColor" strokeWidth={0} />
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav activeTab="swipe" />

      {/* Match Screen Overlay */}
      <AnimatePresence>
        {matchedRestaurant && (
          <MatchScreen
            restaurant={matchedRestaurant}
            onClose={handleCloseMatch}
            onNext={handleCloseMatch}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default SwipeDeck;
