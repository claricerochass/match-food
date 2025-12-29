import React, { createContext, useContext, useState, useEffect } from "react";

const PreferencesContext = createContext();

export function PreferencesProvider({ children }) {
  const [preferences, setPreferences] = useState(() => {
    // Tentar recuperar do localStorage
    const saved = localStorage.getItem("match-food-preferences");
    return saved ? JSON.parse(saved) : { maxDistance: 5 }; // Default 5km
  });

  useEffect(() => {
    // Salvar no localStorage sempre que mudar
    localStorage.setItem("match-food-preferences", JSON.stringify(preferences));
  }, [preferences]);

  const updateMaxDistance = (distance) => {
    setPreferences((prev) => ({ ...prev, maxDistance: distance }));
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updateMaxDistance }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
