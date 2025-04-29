
document.addEventListener('DOMContentLoaded', function () {
    const map = L.map('map').setView([20.5937, 78.9629], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

    // Add Geocoder control
    L.Control.geocoder({
        defaultMarkGeocode: true
    }).addTo(map);

    L.marker([20.5937, 78.9629]).addTo(map)
        .bindPopup('where you be')
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
