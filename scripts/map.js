// Built with help from https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript

function mapStart() {
    const CR = {lat: 50.02554744197325, lng: -125.25163846178474};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom:15,
        center: CR
    });
    const marker = new google.maps.Marker({
        position: CR,
        map: map,
    });
}

window.mapStart = mapStart;