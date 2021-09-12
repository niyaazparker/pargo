//Create angular controller.
var app = angular.module('pargoApp', []);
app.controller('pargoCtrl', function($scope, $http) {

  // Lazy vanilla JS version of handling COOKIES 
  // https://media.giphy.com/media/HGe4zsOVo7Jvy/giphy-downsized.gif?cid=ecf05e47wnkay4efv6xx2gvbxdntbezj6f7wje69vmhsa7fc&rid=giphy-downsized.gif&ct=g
  if (!document.cookie.pargo_token) {
    $http({
      method: 'GET',
      url: 'http://127.0.0.1:3000/pargo_auth'
    }).then(function successCallback(response) {
      // use the access_token, and save refresh token.
      let access_token = response.data.access_token
      document.cookie.pargo_token = response.data.refresh_token

        $http({
          method: 'GET',
          url: 'https://api.staging.pargo.co.za/pickup_points',
          headers: {
            'Authorization': 'Bearer ' + access_token, 
            'Content-Type': 'Content-Type: application/json'
          },
        }).then(function successCallback(response) {
          let cities = response.data.data;
          for (i = 0; i < cities.length; i++) {
            createMarker(cities[i]);
          }
          
        }, function errorCallback(response) {
          console.log(response);
        });

      }, function errorCallback(response) {
         console.log(response); 
    });
  } else {
    // refresh cookie
    let refresh_token = document.cookie.pargo_token;
    $http({
      method: 'POST',
      url: 'http://127.0.0.1:3000/pargo_refresh_auth',
      data: { 'token' : refresh_token },
      headers: {'Content-Type': 'Content-Type: application/json'}
    }).then(function successCallback(response) {
        let access_token = response.data.access_token
        document.cookie.pargo_token = response.data.refresh_token
        $http({
          method: 'GET',
          url: 'https://api.staging.pargo.co.za/pickup_points',
          headers: {
            'Authorization': 'Bearer ' + access_token, 
            'Content-Type': 'Content-Type: application/json'
          },
        }).then(function successCallback(response) {
          let cities = response.data.data;
          for (i = 0; i < cities.length; i++) {
            createMarker(cities[i]);
          }
        }, function errorCallback(response) {
          console.log(response);
        });
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
  }

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

var infoWindow = new google.maps.InfoWindow();

  // let cities = $scope.cities;

  // for (i = 0; i < cities.length; i++) {
  //   console.log(cities[i])
  //   createMarker(cities[i]);
  // }
  

  $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});