import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

// Custom hook to move the map to the selected pin
const MapUpdater = ({ selectedPin }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPin) {
      map.setView([selectedPin.lat, selectedPin.lng], 13); // Zoom and pan to the selected pin
    }
  }, [selectedPin, map]);
  return null;
};

const MapComponent = () => {
  const [pins, setPins] = useState(() => JSON.parse(localStorage.getItem('pins')) || []);
  const [selectedPin, setSelectedPin] = useState(null);

  // Function to save pins to local storage
  const savePins = (newPins) => {
    setPins(newPins);
    localStorage.setItem('pins', JSON.stringify(newPins));
  };

  const PinDropper = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        const newPin = { lat, lng, remark: '', address: '' };

        // Open a prompt for the user to add remarks
        const remark = prompt('Enter a remark for this pin:');
        if (remark) {
          newPin.remark = remark;

          // Fetch the address using Nominatim API
          axios
            .get(`https://nominatim.openstreetmap.org/reverse`, {
              params: {
                format: 'json',
                lat,
                lon: lng,
              },
            })
            .then((response) => {
              const address = response.data.display_name;
              newPin.address = address || 'Address not found';
              savePins([...pins, newPin]);
            })
            .catch(() => {
              newPin.address = 'Address not found';
              savePins([...pins, newPin]);
            });
        }
      },
    });
    return null;
  };

  // Click handler to focus the map on the pin location
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  // Custom marker icons for default and selected pins
  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const selectedIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconSize: [30, 50],
    iconAnchor: [15, 50],
    className: 'highlighted-pin',
  });

  return (
    <div className="map-container">
      {/* Map Component */}
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '600px', width: '80vw' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <PinDropper />
        <MapUpdater selectedPin={selectedPin} />

        {pins.map((pin, idx) => (
          <Marker
            key={idx}
            position={[pin.lat, pin.lng]}
            icon={selectedPin && selectedPin.lat === pin.lat && selectedPin.lng === pin.lng ? selectedIcon : defaultIcon}
          />
        ))}
      </MapContainer>

      {/* Sidebar for listing pins */}
      <div className="pin-list">
        <h3>Saved Pins:</h3>
        <ul>
          {pins.map((pin, idx) => (
            <li key={idx} onClick={() => handlePinClick(pin)} style={{ cursor: 'pointer' }}>
              <p><strong>Remark:</strong> {pin.remark}</p>
              <p><strong>Address:</strong> {pin.address}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
