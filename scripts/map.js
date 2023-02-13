// Built with help from: https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript
// With the searching based on :https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete#maps_places_autocomplete-javascript

function mapStart() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom:15,
        center: {lat: 50.025, lng: -125.251},
        mapTypeControl: false,
    });
    const cardControls = document.getElementById("controlsCard");
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(cardControls);

    const locationInput = document.getElementById("locationInput");
    const autocomplete = new google.maps.places.Autocomplete(locationInput);
    autocomplete.bindTo("bounds", map);

    const infoWindow = new google.maps.InfoWindow();
    const infoWindowContent = document.getElementById("autocomplete-content");
    infoWindow.setContent(infoWindowContent);

    const marker = new google.maps.Marker({
        position: {lat: 50.025, lng: -125.251},
        map: map,
    });
}

window.mapStart = mapStart;