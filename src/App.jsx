import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import LoginScreen from "./components/LoginScreen";
import SwipeDeck from "./components/SwipeDeck";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("splash");

  useEffect(() => {
    if (currentScreen === "splash") {
      const timer = setTimeout(() => {
        setCurrentScreen("login");
      }, 3000); // 3 seconds splash
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {currentScreen === "splash" && <SplashScreen />}
      {currentScreen === "login" && (
        <LoginScreen onLogin={() => setCurrentScreen("swipe")} />
      )}
      {currentScreen === "swipe" && <SwipeDeck />}
    </div>
  );
};

export default App;
