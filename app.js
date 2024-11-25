const map = L.map('map').setView([56.95, 24.11], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function convertToWGS84(coordinates) {
    return LKS92WGS84.convertXYToLatLon(coordinates); 
}

fetch('geomap.json')
    .then(response => response.json())
    .then(data => {

        data.features.forEach(feature => {
            const { coordinates } = feature.geometry;
            const { PLACENAME } = feature.properties;

            const [lat, lon] = convertToWGS84(coordinates);

            L.marker([lat, lon])
                .addTo(map)
                .bindPopup(`<strong>${PLACENAME}</strong>`);
        });
    })
    .catch(error => console.error('Kļūda, ielādējot datus:', error));
