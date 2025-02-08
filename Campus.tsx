import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { Loader } from '@googlemaps/js-api-loader';

interface Location {
  name: string;
  description: string;
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const Campus = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLng | null>(null);
  const [fromLocation, setFromLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      name: 'Main Academic Block',
      description: 'Central administrative building and lecture halls',
      category: 'Academic',
      coordinates: {
        lat: 12.8230,
        lng: 80.0444
      }
    },
    {
      name: 'University Building',
      description: 'Main administrative offices and classrooms',
      category: 'Academic',
      coordinates: {
        lat: 12.8235,
        lng: 80.0440
      }
    },
    {
      name: 'Tech Park',
      description: 'Research and development center with modern labs',
      category: 'Research',
      coordinates: {
        lat: 12.8225,
        lng: 80.0448
      }
    },
    {
      name: 'FSH Block',
      description: 'Faculty of Science and Humanities with specialized labs',
      category: 'Academic',
      coordinates: {
        lat: 12.8228,
        lng: 80.0442
      }
    },
    {
      name: 'BEL Lab',
      description: 'Biomedical Engineering Laboratory with advanced equipment',
      category: 'Research',
      coordinates: {
        lat: 12.8232,
        lng: 80.0446
      }
    },
    {
      name: 'Medical College',
      description: 'State-of-the-art medical education facility',
      category: 'Medical',
      coordinates: {
        lat: 12.8240,
        lng: 80.0450
      }
    },
    {
      name: 'Main Ground',
      description: 'Large sports ground for athletics and events',
      category: 'Sports',
      coordinates: {
        lat: 12.8220,
        lng: 80.0445
      }
    },
    {
      name: 'Java Canteen',
      description: 'Popular student cafeteria with diverse food options',
      category: 'Food',
      coordinates: {
        lat: 12.8233,
        lng: 80.0447
      }
    },
    {
      name: 'Nelson Mandela Hostel',
      description: 'Men\'s hostel with modern amenities',
      category: 'Hostel',
      coordinates: {
        lat: 12.8245,
        lng: 80.0455
      }
    },
    {
      name: 'Mother Teresa Hostel',
      description: 'Women\'s hostel with secure facilities',
      category: 'Hostel',
      coordinates: {
        lat: 12.8248,
        lng: 80.0458
      }
    }
  ];

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          setUserLocation(pos);
          map?.panTo(pos);
          
          new google.maps.Marker({
            position: pos,
            map: map,
            title: 'Your Location',
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#4285F4',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            }
          });
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        }
      );
    }
  };

  const getDirections = (from: Location | null, to: Location) => {
    let origin;
    if (from) {
      origin = `${from.coordinates.lat},${from.coordinates.lng}`;
    } else if (userLocation) {
      origin = `${userLocation.lat()},${userLocation.lng()}`;
    } else {
      alert('Please select a starting point or enable location services');
      return;
    }
    
    const destination = `${to.coordinates.lat},${to.coordinates.lng}`;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
    window.open(url, '_blank');
  };

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['places']
      });

      try {
        const google = await loader.load();
        if (mapRef.current) {
          const newMap = new google.maps.Map(mapRef.current, {
            center: { lat: 12.8230, lng: 80.0444 },
            zoom: 16,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          locations.forEach(location => {
            const marker = new google.maps.Marker({
              position: location.coordinates,
              map: newMap,
              title: location.name,
              animation: google.maps.Animation.DROP
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-semibold">${location.name}</h3>
                  <p class="text-sm">${location.description}</p>
                </div>
              `
            });

            marker.addListener('click', () => {
              setSelectedLocation(location);
              infoWindow.open(newMap, marker);
            });
          });

          setMap(newMap);
          getUserLocation();
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Campus Guide</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Interactive Map</h2>
            <div className="flex gap-4">
              <select
                className="bg-white border border-gray-300 rounded-lg px-4 py-2"
                value={fromLocation ? fromLocation.name : ''}
                onChange={(e) => {
                  const selected = locations.find(loc => loc.name === e.target.value);
                  setFromLocation(selected || null);
                }}
              >
                <option value="">Select starting point</option>
                {locations.map(loc => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
              <button
                onClick={getUserLocation}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Navigation className="h-4 w-4" />
                Use My Location
              </button>
            </div>
          </div>
          <div 
            ref={mapRef}
            className="w-full h-[500px] rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
                selectedLocation?.name === location.name ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <p className="text-gray-600 mb-2">{location.description}</p>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
                    {location.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedLocation(location);
                        map?.panTo(location.coordinates);
                        map?.setZoom(17);
                      }}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition-colors text-sm"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => getDirections(fromLocation, location)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campus;