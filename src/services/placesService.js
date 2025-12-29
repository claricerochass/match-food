import { Loader } from "@googlemaps/js-api-loader";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const loader = new Loader({
  apiKey: API_KEY,
  version: "weekly",
  libraries: ["places"],
});

let placesService = null;
let mapInstance = null; // Instância oculta do mapa necessária para o PlacesService

// Mock Data para fallback
const MOCK_RESTAURANTS = [
  {
    id: "mock1",
    name: "Burger King do Futuro",
    cuisine: "Hamburgueria",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80",
    rating: 4.5,
    user_ratings_total: 1205,
    distance: "1.2 km",
    tags: ["hamburguer", "fast-food"],
    price_level: 2,
    location: { lat: -23.5505, lng: -46.6333 },
  },
  {
    id: "mock2",
    name: "Sushi Yama",
    cuisine: "Japonesa",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    rating: 4.8,
    user_ratings_total: 890,
    distance: "2.5 km",
    tags: ["sushi", "japonês", "fresco"],
    price_level: 3,
    location: { lat: -23.552, lng: -46.635 },
  },
  {
    id: "mock3",
    name: "La Pizza Nostra",
    cuisine: "Italiana",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80",
    rating: 4.2,
    user_ratings_total: 560,
    distance: "0.8 km",
    tags: ["pizza", "italiana", "massas"],
    price_level: 2,
    location: { lat: -23.548, lng: -46.63 },
  },
  {
    id: "mock4",
    name: "Taco Loco",
    cuisine: "Mexicana",
    image:
      "https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&q=80",
    rating: 4.0,
    user_ratings_total: 340,
    distance: "3.0 km",
    tags: ["mexicano", "tacos", "picante"],
    price_level: 1,
    location: { lat: -23.555, lng: -46.64 },
  },
  {
    id: "mock5",
    name: "Salada & Cia",
    cuisine: "Saudável",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    rating: 4.6,
    user_ratings_total: 210,
    distance: "1.5 km",
    tags: ["vegano", "natureba", "detox"],
    price_level: 2,
    location: { lat: -23.553, lng: -46.638 },
  },
];

/**
 * Inicializa o serviço do Google Places.
 * Retorna 'mock' se a API Key não estiver presente, sinalizando uso de dados falsos.
 */
export const initPlacesService = async (mapDiv) => {
  if (!API_KEY) {
    console.warn("Google Maps API Key não fornecida. Usando modo MOCK.");
    return "mock"; // Sinalizador especial para usar mock
  }

  try {
    const google = await loader.load();
    const { Map } = await google.maps.importLibrary("maps");
    const { PlacesService } = await google.maps.importLibrary("places");

    mapInstance = new Map(mapDiv, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });

    placesService = new PlacesService(mapInstance);
    return placesService;
  } catch (error) {
    console.error(
      "Erro ao inicializar Google Places, caindo para mock:",
      error
    );
    return "mock";
  }
};

/**
 * Busca restaurantes próximos.
 * Se placesService não estiver disponível (ou for string "mock"), retorna dados mockados.
 */
export const searchRestaurants = (location, radiusInKm) => {
  return new Promise((resolve, reject) => {
    // Se o serviço não foi inicializado corretamente ou estamos em modo mock
    if (!placesService || placesService === "mock" || !API_KEY) {
      console.log("Retornando dados mockados para desenvolvimento...");
      // Simular delay de rede
      setTimeout(() => {
        resolve(MOCK_RESTAURANTS);
      }, 800);
      return;
    }

    const request = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius: radiusInKm * 1000,
      type: ["restaurant", "food", "cafe"],
      rankBy: google.maps.places.RankBy.PROMINENCE,
    };

    placesService.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const mappedResults = results.map((place) => ({
          id: place.place_id,
          name: place.name,
          cuisine: place.types ? formatCuisines(place.types) : "Variada",
          image: getPhotoUrl(place),
          rating: place.rating || 0,
          user_ratings_total: place.user_ratings_total,
          distance: "0 km",
          tags: place.types ? place.types.slice(0, 3) : [],
          price_level: place.price_level,
          location: place.geometry.location,
        }));
        resolve(mappedResults);
      } else {
        if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          console.warn("Places api falhou, usando mock. Status:", status);
          resolve(MOCK_RESTAURANTS); // Fallback silencioso para mock tb em erro
        }
      }
    });
  });
};

// Utils
const getPhotoUrl = (place) => {
  if (place.photos && place.photos.length > 0) {
    return place.photos[0].getUrl({ maxWidth: 800 });
  }
  return "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80";
};

const formatCuisines = (types) => {
  const usefulTypes = types.filter(
    (t) =>
      !["restaurant", "food", "point_of_interest", "establishment"].includes(t)
  );
  return usefulTypes.length > 0
    ? usefulTypes[0].replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())
    : "Restaurante";
};
