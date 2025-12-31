import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Send } from "lucide-react";
import "../onboarding.css";

function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [locationGranted, setLocationGranted] = useState(false);

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleRequestLocation = async () => {
    try {
      const result = await navigator.permissions.query({ name: "geolocation" });

      if (result.state === "granted") {
        setLocationGranted(true);
        setTimeout(() => handleNext(), 800);
      } else {
        // Solicita permissão
        navigator.geolocation.getCurrentPosition(
          () => {
            setLocationGranted(true);
            setTimeout(() => handleNext(), 800);
          },
          (error) => {
            console.warn("Usuário negou a localização:", error);
            // Mesmo se negar, permite continuar
            handleNext();
          }
        );
      }
    } catch (error) {
      console.error("Erro ao solicitar localização:", error);
      handleNext();
    }
  };

  const completeOnboarding = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    onComplete();
  };

  const skipOnboarding = () => {
    completeOnboarding();
  };

  const slides = [
    {
      id: 0,
      title: (
        <>
          Deslize para o <span className="text-gradient">Match</span>
        </>
      ),
      subtitle:
        "Arraste para a direita para curtir ou para a esquerda para passar.",
      image: "/onboarding-swipe.png",
      buttonText: "Entendi",
      buttonAction: handleNext,
      skipText: null,
      showCard: true,
    },
    {
      id: 1,
      title: (
        <>
          Encontre Perto <span className="text-gradient">de Você</span>
        </>
      ),
      subtitle:
        "Para sugerir os melhores restaurantes e ofertas na sua região, precisamos saber onde você está.",
      image: null,
      buttonText: locationGranted
        ? "Localização Ativada ✓"
        : "Ativar Localização",
      buttonAction: handleRequestLocation,
      skipText: "Agora não, ver mapa depois",
      showLocationPin: true,
      locationGranted,
    },
    {
      id: 2,
      title: (
        <>
          Deu <span className="text-gradient">Match?</span> Chama a galera!
        </>
      ),
      subtitle:
        "Compartilhe seus restaurantes favoritos direto no WhatsApp e combine o próximo rolê num instante.",
      image: null,
      buttonText: "Continuar",
      buttonAction: handleNext,
      skipText: "Pular introdução",
      showShareIcons: true,
    },
  ];

  const currentSlide = slides[currentStep];

  return (
    <div className="onboarding-container">
      {/* Gradient Background */}
      <div className="onboarding-gradient" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          className="onboarding-content"
        >
          {/* Skip Button */}
          {currentStep === 0 && (
            <button className="onboarding-skip" onClick={skipOnboarding}>
              Pular
            </button>
          )}

          {/* Main Visual */}
          <div className="onboarding-visual">
            {currentSlide.showCard && (
              <div className="onboarding-card-demo">
                <div className="demo-card">
                  <img
                    src="/onboarding-burger.jpg"
                    alt="Burger demo"
                    className="demo-card-image"
                  />
                  <div className="demo-card-actions">
                    <div className="demo-action-btn demo-pass">
                      <span>✕</span>
                      <span className="demo-label">PASSAR</span>
                    </div>
                    <div className="demo-center-icon">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="18"
                          fill="rgba(255,255,255,0.2)"
                        />
                        <path
                          d="M20 10L25 20L20 30L15 20L20 10Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="demo-action-btn demo-like">
                      <span>❤</span>
                      <span className="demo-label">CURTIR</span>
                    </div>
                  </div>
                  <div className="demo-card-info">
                    <h3>Burger Joint</h3>
                    <p>📍 1,2 km de você</p>
                  </div>
                </div>
              </div>
            )}

            {currentSlide.showLocationPin && (
              <div className="onboarding-location-visual">
                <div className="location-pulse-container">
                  <div className="location-pulse-ring"></div>
                  <div className="location-pulse-ring delay-1"></div>
                  <div className="location-icon-container">
                    <MapPin size={48} strokeWidth={2} />
                    {locationGranted && (
                      <motion.div
                        className="location-check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      >
                        ✓
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentSlide.showShareIcons && (
              <div className="onboarding-share-visual">
                <motion.div
                  className="share-icon-box food-icon"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🍴
                </motion.div>
                <div className="share-connector">
                  <Send size={20} />
                </div>
                <motion.div
                  className="share-icon-box whatsapp-icon"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.828.738 5.583 2.139 7.985L0 32l8.207-2.139A15.932 15.932 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333c-2.485 0-4.915-.688-7.042-1.99l-.506-.311-5.231 1.363 1.396-5.107-.341-.524A13.27 13.27 0 012.667 16c0-7.364 5.97-13.333 13.333-13.333S29.333 8.636 29.333 16 23.364 29.333 16 29.333z" />
                    <path d="M22.828 18.828c-.364-.182-2.152-1.061-2.485-1.182-.333-.121-.576-.182-.818.182-.242.364-.939 1.182-1.152 1.424-.212.242-.424.273-.788.091-.364-.182-1.536-.566-2.927-1.806-1.082-.966-1.812-2.158-2.024-2.522-.212-.364-.023-.561.159-.742.164-.163.364-.424.545-.636.182-.212.242-.364.364-.606.121-.242.061-.455-.03-.636-.091-.182-.818-1.97-1.121-2.697-.295-.709-.595-.612-.818-.624-.212-.011-.455-.013-.697-.013s-.636.091-.97.455c-.333.364-1.273 1.243-1.273 3.030s1.303 3.515 1.485 3.758c.182.242 2.566 3.915 6.212 5.49.868.375 1.545.599 2.073.767.872.277 1.666.238 2.294.144.7-.105 2.152-.88 2.455-1.73.303-.848.303-1.576.212-1.73-.091-.152-.333-.242-.697-.424z" />
                  </svg>
                </motion.div>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="onboarding-text">
            <h1 className="onboarding-title">{currentSlide.title}</h1>
            <p className="onboarding-subtitle">{currentSlide.subtitle}</p>
          </div>

          {/* Action Button */}
          <button
            className={`onboarding-button ${locationGranted ? "granted" : ""}`}
            onClick={currentSlide.buttonAction}
            disabled={locationGranted && currentStep === 1}
          >
            {currentStep === 1 && !locationGranted && (
              <MapPin size={20} style={{ marginRight: "8px" }} />
            )}
            {currentSlide.buttonText}
            {currentStep !== 1 && (
              <ArrowRight size={20} style={{ marginLeft: "8px" }} />
            )}
          </button>

          {/* Skip Text */}
          {currentSlide.skipText && (
            <button className="onboarding-skip-text" onClick={skipOnboarding}>
              {currentSlide.skipText}
            </button>
          )}

          {/* Pagination Dots */}
          <div className="onboarding-pagination">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className={`pagination-dot ${
                  currentStep === slide.id ? "active" : ""
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Onboarding;
