// Inicializē karti ar centru Latvijā
const map = L.map('map').setView([56.95, 24.11], 8); // Latitude un Longitude Rīgai

// Pievieno OpenStreetMap pamata slāni
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Funkcija, lai pārvērstu EPSG:3059 koordinātas uz WGS84
function convertToWGS84(coordinates) {
    return LKS92WGS84.convertXYToLatLon(coordinates); // No functions.js
}

// Ielādē datus no geomap.json
fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        // Iterē caur katru vietu datu failā
        data.features.forEach(feature => {
            const { coordinates } = feature.geometry; // Koordinātas
            const { PLACENAME } = feature.properties; // Vietas nosaukums

            // Konvertē koordinātas uz WGS84 formātu
            const [lat, lon] = convertToWGS84(coordinates);

            // Izveido marķieri un pievieno kartei
            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<strong>${PLACENAME}</strong>`); // Pievieno nosaukumu kā uznirstošo logu
        });
    })
    .catch(error => console.error('Kļūda, ielādējot datus:', error));
