var myMarker;
var map;

function chooseAddr(lat1, lng1) {
    myMarker.closePopup();
    map.setView([lat1, lng1], 18);
    myMarker.setLatLng([lat1, lng1]);
    lat = lat1.toFixed(8);
    lon = lng1.toFixed(8);
    document.getElementById('lat').value = lat;
    document.getElementById('lon').value = lon;
    myMarker.bindPopup("Lat " + lat + "<br />Lon " + lon).openPopup();
  }

function myFunction(arr) {
    var out = "<br />";
    var i;

    if (arr.length > 0) {
      for (i = 0; i < arr.length; i++) {
        out += "<div class='address' title='Show Location and Coordinates' onclick='chooseAddr(" + arr[i].lat + ", " + arr[i].lon + ");return false;'>" + arr[i].display_name + "</div>";
      }
      document.getElementById('results').innerHTML = out;
    }
    else {
      document.getElementById('results').innerHTML = "Sorry, no results...";
    }

  }

function addr_search() {
    var inp = document.getElementById("addr");
    var xmlhttp = new XMLHttpRequest();
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp.value;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

function addr_search_with_input(inp) {
    var xmlhttp = new XMLHttpRequest();
    var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + inp;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        console.log(myArr);
        myMarker.closePopup();
        lat = myArr[0].lat;
        lon = myArr[0].lon;
        map.setView([lat, lon], 18);
        myMarker.setLatLng([lat, lon]);
        document.getElementById('lat').value = lat;
        document.getElementById('lon').value = lon;
        myMarker.bindPopup("Lat " + lat + "<br />Lon " + lon).openPopup();
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

function addr_search_with_users(users, usersToDogs) {
    for (var i = 0; i < users.length; i++) {
      var user = users[i];  
      var xmlhttp = new XMLHttpRequest();
      var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + user.user_city;
      if (i == 0) {
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            myMarker.closePopup();
            lat = myArr[0].lat;
            lon = myArr[0].lon;
            map.setView([lat, lon], 12);
            myMarker.setLatLng([lat, lon]);
            document.getElementById('lat').value = lat;
            document.getElementById('lon').value = lon;
            myMarker.bindPopup("City " + user.user_city + "<br />Pet name " + usersToDogs[user.id][0].dog_name).openPopup();
          }
        };
      } else {
        xmlhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            lat = myArr[0].lat;
            lon = myArr[0].lon;
            var myMarker = L.marker([lat, lon], { title: "Coordinates", alt: "Coordinates", draggable: true }).addTo(map);
            myMarker.bindPopup("City " + user.user_city + "<br />Pet name " + usersToDogs[user.id][0].dog_name).openPopup();
          }
        };
      }
      xmlhttp.open("GET", url, true);
      xmlhttp.send();
    }
  }

$(document).ready(function () {

  var startlat = 33.68569690;
  var startlon = -117.82598190;

  var options = {
    center: [startlat, startlon],
    zoom: 9
  }

  document.getElementById('lat').value = startlat;
  document.getElementById('lon').value = startlon;

  map = L.map('map', options);
  var nzoom = 15;

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 15,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamloeWVvbm9oMTIiLCJhIjoiY2s3NncyZnVyMDFpMDNmdGZmazI3YXM5NCJ9.gCrZ981lIf5ga3Anwm2LvQ'
  }).addTo(map);

  //------marker-------//
  myMarker = L.marker([startlat, startlon], { title: "Coordinates", alt: "Coordinates", draggable: true }).addTo(map).on('dragend', function () {
    var lat = myMarker.getLatLng().lat.toFixed(8);
    var lon = myMarker.getLatLng().lng.toFixed(8);
    var czoom = map.getZoom();
    if (czoom < 18) { nzoom = czoom + 2; }
    if (nzoom > 18) { nzoom = 18; }
    if (czoom != 18) { map.setView([lat, lon], nzoom); } else { map.setView([lat, lon]); }
    document.getElementById('lat').value = lat;
    document.getElementById('lon').value = lon;
    myMarker.bindPopup("Lat " + lat + "<br/>Lon " + lon).openPopup();
  });

  function createPopup() {

    var popup = L.popup()
      .setLatLng([33.68569690, -117.82598190])
      .setContent("<a href='#'>Name of the Dog</a>")
      .openOn(map);

  }
  
  $.get("/api/dogs", function () {
    console.log();

  }).then(function (response) {
    var users = []
    for (var i = 0; i < response.length; i++) {
      users.push(response[i].User);
    }
    console.log(users);

    var usersToDogs = {}
    for (var i = 0; i < response.length; i++) {
      if (!(response[i].User.id in usersToDogs)) {
        usersToDogs[response[i].User.id] = []
      } 
      usersToDogs[response[i].User.id].push(response[i]);
    }
    console.log(usersToDogs);

    addr_search_with_users(users, usersToDogs);
    for (var i = 0; i < response.length; i++) {
      $('.dogCard').append(`<div class="card" style="width: 100%;">
      
      <div class="card-body">
       
      <div class="row" id="${response[i].id}">
          <div class="col-6">
          <h5 class="card-title display-4">${response[i].dog_name}</h5>
          </div>
          <div clss="col-6">
          <button type="button" class="btn btn-warning btn-sm" id="sendEmail" onClick="sendEmail()" >Copy Email</button>
          </div>
        
        </div>


        <div class="row">
          <div class="col-6">
            <p class="card-text lead">Breed: ${response[i].dog_breed}</p>
            <p class="card-text lead">Size: ${response[i].dog_height}</p>
          </div>
          <div class="col-6">
            <p class="card-text lead">Age: ${response[i].dog_age}</p>
            <p class="card-text lead">Favorite Activity: ${response[i].favorite_activity}</p>
          </div>
        </div>
        
      </div>`)

     

      console.log(response[i].User)
    }

  })

})
