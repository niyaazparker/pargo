
  
//Create angular controller.
var app = angular.module('pargoApp', []);
app.controller('pargoCtrl', function($scope) {

  var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(-34.2793074, 18.2556325,5),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
}

$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

$scope.markers = [];

var infoWindow = new google.maps.InfoWindow();

var createMarker = function (info){
    
    var marker = new google.maps.Marker({
        map: $scope.map,
        icon: 'images/location.svg',
        position: new google.maps.LatLng(info.attributes.coordinates.lat, info.attributes.coordinates.lng),
        title: info.attributes.name,
        province: info.attributes.province,
        suburb: info.attributes.suburb,
        city: info.attributes.city,
        postalCode: info.attributes.postalCode,
        address1: info.attributes.address1,
        openingHours:info.attributes.openingHours
    });
    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
    
    google.maps.event.addListener(marker, 'click', function(){
        infoWindow.setContent('<h2>' + marker.title + '</h2>' + '</h1>' + '<p>' + marker.province + '</p>' + '<p>' + marker.suburb + '</p>' + '<p>' + marker.city + '</p>' + '<p>' + marker.postalCode + '</p>' + '<p>' + marker.address1 + '</p>'+ '<p>' + marker.openingHours + '</p>');
        infoWindow.open($scope.map, marker);
    });
    
    $scope.markers.push(marker);
    
} 
  for (i = 0; i < cities.length; i++) {
    createMarker(cities[i]);
  }
  

  $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});