import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import SwipeDeck from "./components/SwipeDeck";
import { PreferencesProvider } from "./contexts/PreferencesContext";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simular tempo de carregamento inicial
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PreferencesProvider>
      <div className="app-container">
        <AnimatePresence mode="wait">
          {showSplash ? (
            <SplashScreen key="splash" />
          ) : (
            <SwipeDeck key="deck" />
          )}
        </AnimatePresence>
      </div>
    </PreferencesProvider>
  );
}

export default App;
