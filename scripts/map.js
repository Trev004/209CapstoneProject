/* 
#1. Built with help from: https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript
#2. With the searching adapted from :https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete#maps_places_autocomplete-javascript
#3. Current Location adapted from: https://developers.google.com/maps/documentation/javascript/geolocation
    #3-a. Further adapted from the page listed above, but includes some code to display an error if the get current location fails
#4. Modified based on: https://developers.google.com/maps/documentation/javascript/examples/hiding-features
    #4-a. featureType documentation: https://developers.google.com/maps/documentation/javascript/style-reference#style-features

    Made by Trevor Jacob.
    The 3 Sources above were mainly used as a way for me to figure out *how* the google API works. 
    An example of my workflow would be, seeing the tutorial, seeing the end result, deciding whether I could use parts
    of the tutorial, then reading through to see what parts did what function, then adding and adapting what parts I needed.
    A good example of this is with the 2nd citation, (#2.) the original tutorial had many extra lines and functions
    that I didn't need for mine, so instead of following it directly, I used it to learn what lines performed what function, 
    adapted and added to better suit my needs.
*/
function mapStart() {
    // #1.
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom:15,
        center: {lat: 50.025, lng: -125.251},
        mapTypeControl: false,
    });

    const cardControls = document.getElementById("controlsContainer");
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(cardControls);

    const locationInput = document.getElementById("locationInput");
    const autocomplete = new google.maps.places.Autocomplete(locationInput);
    autocomplete.bindTo("bounds", map);

    let infoWindow = new google.maps.InfoWindow();
    const infoWindowContent = document.getElementById("autocomplete-content");
    infoWindow.setContent(infoWindowContent);

    const marker = new google.maps.Marker({
        position: {lat: 50.025, lng: -125.251},
        map: map,
        visible: false,
    });

    // #2.
    autocomplete.addListener("place_changed", () =>{
        infoWindow.close();
        marker.setVisible(false);

        const placeResult = autocomplete.getPlace();

        if (placeResult.geometry == null || placeResult.geometry.location == null){
            window.alert("Sorry, we couldn't find anything based on '" + placeResult.name + "' \nPlease make sure you're clicking on the auto-completed results!");
            return;
        }
        if (placeResult.geometry.viewport) {
            map.fitBounds(placeResult.geometry.viewport);
        } else {
            map.setCenter(placeResult.geometry.viewport);
            map.setZoom(15);
        }
        marker.setPosition(placeResult.geometry.location);
        marker.setVisible(true);
    });

    // #3.
    const locationButton = document.getElementById("currentLocationButton");
    locationButton.addEventListener("click", () =>{
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) =>{
                    const pos ={
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("You should be somewhere around here");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    marker.setPosition(pos);
                    marker.setVisible(true);
                },
                // #3-a.
                () =>{
                    infoWindow.setPosition(map.getCenter());
                    infoWindow.setContent("Sorry, we've run into an error, please ensure that geolocation is enabled in your browser settings!");
                    infoWindow.open(map);
                }
            );
        }
    });
    // #4.
    document.getElementById("all").addEventListener("click" ,() =>{
        map.setOptions({styles: filters["all"]});
    });
    document.getElementById("businesses").addEventListener("click" ,() =>{
        map.setOptions({styles: filters["businesses"]});
    });
    document.getElementById("doctors").addEventListener("click" ,() =>{
        map.setOptions({styles: filters["doctors"]});
    });
    document.getElementById("attractions").addEventListener("click" ,() =>{
        map.setOptions({styles: filters["attractions"]});
    });
}
// #4-a. 
const filters = {
    all: [],
    businesses: [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "poi.business",
            stylers: [{ visibility: "on" }],
        }
    ],
    doctors: [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "poi.medical",
            stylers: [{ visibility: "on" }],
        }
    ],
    attractions: [
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }],
        },
        {
            featureType: "poi.attraction",
            stylers: [{ visibility: "on" }],
        }
    ],
  };
window.mapStart = mapStart;