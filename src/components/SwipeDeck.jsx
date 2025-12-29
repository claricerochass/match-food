import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Heart,
  Star,
  Settings,
  User,
  MapPin,
  AlertCircle,
} from "lucide-react";
import RestaurantCard from "./RestaurantCard";
import BottomNav from "./BottomNav";
import MatchScreen from "./MatchScreen";
import SettingsScreen from "./SettingsScreen";
import { useGeolocation } from "../hooks/useGeolocation";
import { usePreferences } from "../contexts/PreferencesContext";
import {
  initPlacesService,
  searchRestaurants,
} from "../services/placesService";

function SwipeDeck() {
  const [deck, setDeck] = useState([]);
  const [matchedRestaurant, setMatchedRestaurant] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const { preferences } = usePreferences();
  const mapRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPlaces = async () => {
      // Se não tiver location ainda, esperar
      if (geoLoading || !location) return;

      setIsLoading(true);
      setFetchError(null);

      // Inicializar serviço se necessário
      const service = await initPlacesService(mapRef.current);

      // Se retornou null, é erro crítico. Se retornou "mock" ou objeto, prossegue.
      if (!service) {
        if (isMounted) {
          setFetchError("Erro ao inicializar serviço de mapas.");
          setIsLoading(false);
        }
        return;
      }

      try {
        const results = await searchRestaurants(
          location,
          preferences.maxDistance
        );
        if (isMounted) {
          setDeck(results);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Erro ao buscar restaurantes:", err);
        if (isMounted) {
          setFetchError(
            "Não foi possível encontrar restaurantes nesta região."
          );
          setIsLoading(false);
        }
      }
    };

    fetchPlaces();

    return () => {
      isMounted = false;
    };
  }, [location, geoLoading, preferences.maxDistance]);

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
      {/* Div oculta para o Google Maps Service */}
      <div ref={mapRef} style={{ display: "none" }}></div>

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

        <button className="filter-button" onClick={() => setShowSettings(true)}>
          <Settings size={20} />
        </button>
      </header>

      {/* Card Area */}
      <div className="card-area">
        {/* Background Stack Effect */}
        <div className="card-stack-bg"></div>

        <AnimatePresence>
          {isLoading || geoLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
              <p>Buscando restaurantes próximos...</p>
            </div>
          ) : geoError ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 px-8 text-center gap-4">
              <MapPin size={48} className="text-red-400" />
              <p>{geoError}</p>
              <p className="text-xs text-gray-400">
                Verifique se a localização está ativada.
              </p>
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 px-8 text-center gap-4">
              <AlertCircle size={48} className="text-yellow-500" />
              <p>{fetchError}</p>
            </div>
          ) : deck.length > 0 ? (
            deck.map((restaurant, index) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onSwipe={handleSwipe}
                isTop={index === deck.length - 1}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center px-6">
              <p className="text-xl font-bold mb-2">Sem mais opções!</p>
              <p>
                Não encontramos mais restaurantes na sua área com os filtros
                atuais.
              </p>
              <button
                onClick={() => setShowSettings(true)}
                className="mt-4 px-6 py-2 bg-orange-100 text-orange-600 rounded-full font-bold text-sm"
              >
                Aumentar Distância
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Reaction Buttons */}
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

      {/* Settings Screen Overlay */}
      <AnimatePresence>
        {showSettings && (
          <SettingsScreen onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>

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
