
document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([40.776643, -73.968782], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        minZoom: 1
    }).addTo(map);

    // Add Geocoder control
    L.Control.geocoder({
        defaultMarkGeocode: true
    }).addTo(map);

    L.marker([40.776643, -73.968782]).addTo(map)
        .bindPopup('search where you be ')
        .openPopup();

    const popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("location " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);
});
