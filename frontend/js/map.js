var markers = [];
const $cards = document.querySelector(".cards");

fetch("http://localhost:8081/facilities")
  .then((response) => response.json())
  .then((data) => {
    makeMap(data);
  });


function listTemplate(data) {
  for (var i = 0; i < data.length; i++) {
    const card = `<div class="card">
  <div class="first_item">
    <div id="facility_name">${data[i].content.fname}</div>
    <div id="homepage"><img src="../image/icn_website.png"></div>
  </div>
  <div id="line"></div>
  <div class="second_item">
    <div id="address"><img src="../image/icn_address.png"></div>
    <div id="address_txt">&nbsp;${data[i].content.add}</div>
  </div>
  <div class="third_item">
    <div id="tel"><img src="../image/icn_number.png"></div>
    <div>&nbsp;${data[i].content.tel}</div>
  </div>
</div>`
    $cards.insertAdjacentHTML('beforeend', card)
  }

}

async function makeMap(info) {

  //map optiosn
  var options = {
    zoom: 15,
    center: { lat: 37.5663, lng: 126.9779 }
  }
  //new map
  var map = new google.maps.Map(document.getElementById('map'), options);



  let locations = [];
  for (var i in info) {

    let instance = {
      coords: { lat: info[i].latitude, lng: info[i].longitude },
      content: { fname: info[i].시설명, cat: info[i].카테고리, home: info[i].홈페이지, add: info[i].주소, tel: info[i].전화번호 }
    };
    locations.push(instance);
  }

  var filter = { 1: '문예회관', 2: '지방문화원', 3: '생활문화센터', 4: '문화의집', 5: '스포츠', 6: '도서관', 7: '미술관', 8: '박물관' }

  for (var i in locations) {
    if (locations[i].content.cat == filter[data]) {
      markers.push(locations[i]);
    }

  }

  //Lopp through markers
  for (var i = 0; i < markers.length; i++) {
    addMarker(markers[i]);
  }

  //add marker function
  function addMarker(props) {
    var marker = new google.maps.Marker({
      map,
      draggable: false,
      animation: google.maps.Animation.DROP,
      position: props.coords,
      icon: props.myIcon,
      map: map // insert this marker into the map
    });

    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content.fname
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  }

  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {

      const pos = {
        lat: 37.5663,
        lng: 126.9779
      };

      infoWindow = new google.maps.InfoWindow();
      infoWindow.open(map);
      map.setCenter(pos);

      var myIcon = new google.maps.MarkerImage("../image/Group 291.png");

      addMarker({
        coords: { lat: pos.lat, lng: pos.lng },
        myIcon: myIcon
      });

      for (var i = 0; i < markers.length; i++) {
        markers[i].distance = getDistanceFromLatLonInKm(
          pos.lat,
          pos.lng,
          markers[i].coords.lat,
          markers[i].coords.lng
        );
      }
      markers.sort(function (first, second) {
        return first.distance - second.distance;
      });
      listTemplate(markers)

    });
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}


// var map;
var temp = location.href.split("?");
var data = temp[1]

function category(number) {
  for (var i = 1; i <= 8; i++) {
    const $categoryIMG = document.querySelector(`#category${i}IMG`);
    $categoryIMG.setAttribute("src", `../image/category${i}.png`);
  }
  const $categoryIMG = document.querySelector(`#category${data}IMG`);
  $categoryIMG.setAttribute("src", `../image/category${data}_click.png`);
}

function category2(number) {
  for (var i = 1; i <= 8; i++) {
    const $categoryIMG = document.querySelector(`#category${i}IMG`);
    $categoryIMG.setAttribute("src", `../image/category${i}.png`);
  }
  const $categoryIMG = document.querySelector(`#category${data}IMG`);
  $categoryIMG.setAttribute("src", `../image/category${data}_click.png`);
  location.href = "map.html?" + number;
  num = number;
}


category(data)

function home() {
  location.href = "main.html";
}
