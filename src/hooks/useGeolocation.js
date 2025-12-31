import { useState, useEffect } from "react";

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        // Fallback em caso de erro (ex: permissão negada)
        // Av. Ipiranga, 6681 - Partenon, Porto Alegre - RS (PUCRS)
        const fallbackLocation = {
          lat: -30.0602364,
          lng: -51.1742839,
        };

        console.warn(
          "Usando localização de fallback (PUCRS) devido a erro de geolocalização:",
          err.message
        );

        setLocation(fallbackLocation);
        // Não definimos erro aqui para permitir que a app continue funcionando com o fallback
        setError(null);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return { location, error, loading };
}
