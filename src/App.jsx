import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Onboarding from "./components/Onboarding";
import SwipeDeck from "./components/SwipeDeck";
import { PreferencesProvider } from "./contexts/PreferencesContext";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    // Simular tempo de carregamento inicial
    const timer = setTimeout(() => {
      setShowSplash(false);

      // Verificar se é a primeira vez que o usuário acessa
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      } else {
        setShowApp(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    setShowApp(true);
  };

  return (
    <PreferencesProvider>
      <div className="app-container">
        <AnimatePresence mode="wait">
          {showSplash && <SplashScreen key="splash" />}
          {showOnboarding && (
            <Onboarding
              key="onboarding"
              onComplete={handleOnboardingComplete}
            />
          )}
          {showApp && <SwipeDeck key="deck" />}
        </AnimatePresence>
      </div>
    </PreferencesProvider>
  );
}

export default App;
