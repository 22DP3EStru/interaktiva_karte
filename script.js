// Inicializē karti
const map = L.map('map').setView([56.95, 24.11], 8); // Centrs: Latvija

// Pievieno pamata kartes slāni
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Koordinātu pārvēršana no EPSG:3059 uz EPSG:4326
function convertToWGS84(coordinates) {
    return LKS92WGS84.convertXYToLatLon(coordinates);
}

// Ielādē datus un ģenerē marķierus
fetch('geomap.json')
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            const { coordinates } = feature.geometry;
            const { PLACENAME } = feature.properties;

            // Konvertē koordinātas
            const latLng = convertToWGS84(coordinates);

            // Izveido marķieri
            L.marker([latLng[0], latLng[1]])
                .addTo(map)
                .bindPopup(`<strong>${PLACENAME}</strong>`);
        });
    })
    .catch(error => console.error('Kļūda datu ielādē:', error));
