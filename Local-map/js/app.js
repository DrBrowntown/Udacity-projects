// Global variables
var map;
// Create placemarkers array to use in multiple functions to have control
// over the number of places that show.
var placeMarkers = [];
var google;


function initMap() {
   
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.6782, lng: -73.97},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
 
  // Create a searchbox in order to execute a places search
  var searchBox = new google.maps.places.SearchBox(
      document.getElementById('places-search'));
  // Bias the searchbox to within the bounds of the map.
  searchBox.setBounds(map.getBounds());
  
  

  // The following group uses the location array (locations.js) to create an array of markers on initialize.
  
  for (var i = 0; i < locations.length; i++) {  
    var title = locations[i].title;
    var type = locations[i].type;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      title: title,
      type: type,        
    });
    // Push the marker to our array of markers.
    placeMarkers.push(marker);
    // Create an onclick event to open the large infowindow at each marker.
    
  }
  document.getElementById('search-museums').addEventListener('click', searchMuseums);

  document.getElementById('search-restaurants').addEventListener('click', searchRestaurants);

  document.getElementById('search-bars').addEventListener('click', searchBars);

  document.getElementById('search-shops').addEventListener('click', searchShops);

  document.getElementById('hide-listings').addEventListener('click', function() {
    hideMarkers(placeMarkers);
  });

  // Listen for the event fired when the user selects a prediction from the
  // picklist and retrieve more details for that place.
  searchBox.addListener('places_changed', function() {
    searchBoxPlaces(this);
  });

  // Listen for the event fired when the user selects a prediction and clicks
  // "go" more details for that place.
  document.getElementById('go-places').addEventListener('click', textSearchPlaces);
 
}

// Extend the boundaries of the map for each marker and display the marker
function search(i) {
  hideMarkers(placeMarkers);
  var bounds = new google.maps.LatLngBounds();
  var placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
      query: placeMarkers[i].title,
      bounds: bounds
    }, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        createMarkersForPlaces(results);
      }
    });
  map.fitBounds(bounds);
}

// This function will loop through the markers array and display museums.
function searchMuseums() {
  for (var i = 0; i < placeMarkers.length; i++) {
    if (placeMarkers[i].type == 'museum-search') {
      search(i);
    }    
  }  
}
     
// This function will loop through the markers array and display restaurants.
function searchRestaurants() {
  for (var i = 0; i < placeMarkers.length; i++) {
    if (placeMarkers[i].type == 'restaurant-search') {
      search(i);              
    }    
  }  
}

// This function will loop through the markers array and display bars.
function searchBars() {  
  for (var i = 0; i < placeMarkers.length; i++) {
    if (placeMarkers[i].type == 'bar-search') {
      search(i);              
    }    
  }  
}

// This function will loop through the markers array and display shops.
function searchShops() { 
  for (var i = 0; i < placeMarkers.length; i++) {
    if (placeMarkers[i].type == 'shop-search') {
      search(i);              
    }    
  }
}

// This function will loop through the listings and hide them all.
function hideMarkers(markers) {
  for (var i = 0; i < placeMarkers.length; i++) {
    placeMarkers[i].setMap(null);
  }
}

// This function fires when the user selects a searchbox picklist item.
// It will do a nearby search using the selected query string or place.
function searchBoxPlaces(searchBox) {
  hideMarkers(placeMarkers);
  var places = searchBox.getPlaces();
  if (places.length === 0) {
    window.alert('We did not find any places matching that search!');
  } else {
  // For each place, get the icon, name and location.
    createMarkersForPlaces(places);
  }
}

// This function firest when the user select "go" on the places search.
// It will do a nearby search using the entered query string or place.
function textSearchPlaces() {
  var bounds = map.getBounds();
  hideMarkers(placeMarkers);
  var placesService = new google.maps.places.PlacesService(map);
  placesService.textSearch({
    query: document.getElementById('places-search').value,
    bounds: bounds
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      createMarkersForPlaces(results);
    }
  });
}

// This function creates markers for each place found in either places search.
function createMarkersForPlaces(places) {
  var errorForDuplicateInfoWindow = function() {      
      if (placeInfoWindow.marker == this) {
        alert("This infowindow already is on this marker!");
      } else {         
        getPlacesDetails(this, placeInfoWindow);
      }
    };
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < places.length; i++) {
    var place = places[i];
    var icon = {
      url: place.icon,
      size: new google.maps.Size(35, 35),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(15, 34),
      scaledSize: new google.maps.Size(25, 25)
    };
    // Create a marker for each place.
    var marker = new google.maps.Marker({

      map: map,
      icon: icon,
      title: place.name,
      position: place.geometry.location,
      id: place.place_id
    });
    marker.setAnimation( google.maps.Animation.DROP ); 
    // Create a single infowindow to be used with the place details information
    // so that only one is open at once.
    var placeInfoWindow = new google.maps.InfoWindow();
    // If a marker is clicked, do a place details search on it in the next function.
    marker.addListener('click', errorForDuplicateInfoWindow);
    placeMarkers.push(marker);
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  }
  map.fitBounds(bounds);
}

// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow) {
marker.setAnimation( google.maps.Animation.DROP );
var service = new google.maps.places.PlacesService(map);
service.getDetails({
  placeId: marker.id
}, function(place, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    // Set the marker property on this infowindow so it isn't created again.
    infowindow.marker = marker;
    var innerHTML = '<div>';
    if (place.name) {
      innerHTML += '<strong>' + place.name + '</strong>';
    }
    if (place.formatted_address) {
      innerHTML += '<br>' + place.formatted_address;
    }
    if (place.formatted_phone_number) {
      innerHTML += '<br>' + place.formatted_phone_number;
    }
    if (place.opening_hours) {
      innerHTML += '<br><br><strong>Hours:</strong><br>' +
          place.opening_hours.weekday_text[0] + '<br>' +
          place.opening_hours.weekday_text[1] + '<br>' +
          place.opening_hours.weekday_text[2] + '<br>' +
          place.opening_hours.weekday_text[3] + '<br>' +
          place.opening_hours.weekday_text[4] + '<br>' +
          place.opening_hours.weekday_text[5] + '<br>' +
          place.opening_hours.weekday_text[6];
    }
    if (place.photos) {
      innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
          {maxHeight: 100, maxWidth: 200}) + '">';
    }
    innerHTML += '</div>';
    infowindow.setContent(innerHTML);
    infowindow.open(map, marker);

    //Uses wikipedia API to search for articles relevant to the location name.
    loadData(place.name);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
  }
});
}

window.mapError = function( errorMsg, url, lineNumber ) {
    alert( 'Google Maps Failed To Load' );
};

//Uses Wikipedia API to search for articles relevant to the location name.

function loadData(place) {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');    

    // clear out old data before new request
    $wikiElem.text("");  
    
    var cityStr = place;    
   
    //Error handling for if something breaks in the wiki API
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("Failed to get Wikipedia resources.");
    }, 8000);
    
   //load wikipedia articles 
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json';
    console.log(wikiUrl);
    //gets json file from wiki api
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        //jsonp: "callback"
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                console.log(url);
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            }

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
}