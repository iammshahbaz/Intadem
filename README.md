# Pin Drop with Remarks

This project is a simple **Pin Drop with Remarks** tool that allows users to interact with a map, drop pins at specific locations, add remarks, and automatically fetch the address of the pin location. Users can view all the saved pins in a sidebar, and clicking a pin in the sidebar navigates to the pin location on the map. The pins and remarks persist across sessions using **local storage**.

## Features

- **Interactive Map**: Users can click anywhere on the map to drop a pin.
- **Remarks and Address**: After dropping a pin, users can add remarks and automatically fetch the address based on the pin's latitude and longitude using the **Nominatim API**.
- **Saved Pins Sidebar**: The saved pins, along with their remarks and addresses, are displayed in a sidebar. Clicking on a pin in the sidebar brings the map view to the corresponding pin location.
- **Local Storage**: Pins, remarks, and addresses persist across browser sessions using the browser's local storage.
- **Responsive Design**: The map resizes according to screen size for a better user experience on mobile and desktop devices.

## Technologies Used

- **Vite**: A fast build tool for modern web projects.
- **React**: A JavaScript library for building user interfaces.
- **React-Leaflet**: A React wrapper for **Leaflet**, a popular JavaScript library for interactive maps.
- **Axios**: For making HTTP requests to the Nominatim API to fetch addresses.
- **Local Storage**: For persisting pin data across sessions.

## Usage

1. **Drop a Pin**: Click anywhere on the map to drop a pin.
2. **Add Remarks**: When the pin is dropped, a prompt will appear to enter a remark.
3. **Fetch Address**: The address for the dropped pin is fetched automatically using the Nominatim API.
4. **View Pins**: All saved pins, along with remarks and addresses, are displayed in the sidebar.
5. **Navigate to Pins**: Click on any pin in the sidebar to center the map on that pin.
6. **Persistence**: Pins and remarks persist across sessions using local storage.

## Dependencies

- [React](https://reactjs.org/)
- [React-Leaflet](https://react-leaflet.js.org/)
- [Leaflet](https://leafletjs.com/)
- [Axios](https://axios-http.com/)
- [Nominatim API](https://nominatim.org/)



