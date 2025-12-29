import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, MapPin } from "lucide-react";
import { usePreferences } from "../contexts/PreferencesContext";

function SettingsScreen({ onClose }) {
  const { preferences, updateMaxDistance } = usePreferences();
  const [localDistance, setLocalDistance] = React.useState(
    preferences.maxDistance
  );

  const handleSave = () => {
    updateMaxDistance(localDistance);
    onClose();
  };

  return (
    <motion.div
      className="settings-screen"
      initial={{ opacity: 0, y: "100%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="settings-header">
        <h2>Configurações</h2>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      <div className="settings-content">
        <div className="setting-item">
          <div className="setting-label">
            <MapPin size={20} className="text-orange-500" />
            <h3>Distância Máxima</h3>
          </div>
          <div className="setting-value">{localDistance} km</div>

          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="50"
              value={localDistance}
              onChange={(e) => setLocalDistance(Number(e.target.value))}
              className="range-slider"
            />
            <div className="range-labels">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>
        </div>

        <button className="save-button" onClick={handleSave}>
          <Save size={20} />
          Salvar Preferências
        </button>
      </div>
    </motion.div>
  );
}

export default SettingsScreen;
