import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';

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

  // focus the map on the pin location
  const handlePinClick = (pin) => {
    setSelectedPin(pin);
  };

  return (
    <div className="map-container">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '80vw' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <PinDropper />

        {pins.map((pin, idx) => (
          <Marker key={idx} position={[pin.lat, pin.lng]} />
        ))}
      </MapContainer>

      {/* Sidebar */}
      <div className="pin-list">
        <h3>Saved Pins:</h3>
        <ul>
          {pins.map((pin, idx) => (
            <li key={idx} onClick={() => handlePinClick(pin)}>
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
