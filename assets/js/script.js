//Marvel API Key
var privKey = "f7b73285d9cec4962b01dc78e356e5b8a0e6b78f";
var pubKey = "d2eac0264cc9a3719ac91f730963a3e8";

function getHeroId() {

    //per API documentation, new timestamp needed with every request
    var ts = new Date().getTime();
    //per terms of use, privKey must be encrypted 
    var hash = CryptoJS.MD5(ts + privKey + pubKey).toString();

    var heroName = "hulk"; //$("#hero");
    
    var url = "https://gateway.marvel.com/v1/public/characters?name=" + heroName;

    console.log(url);
    $.getJSON(url, {
        ts: ts,
        apikey: pubKey,
        hash: hash,

    })
    .done(function(data) {
        console.log(data);
        //return Id
    })
    .fail(function(err) {
        console.log(err); //error codes found on developer.marvel.com
    });
};

getHeroId(); //$(document).on("click", "#heroBtn", getHeroId());

//next step scrape

//https://gateway.marvel.com:443/v1/public/characters?name=hulk&apikey=d2eac0264cc9a3719ac91f730963a3e8
//https://gateway.marvel.com:433/v1/public/characters?name=hulk&ts=1637102859893&apikey=d2eac0264cc9a3719ac91f730963a3e8&hash=83ea153556699b9a1027a3e058859bb2

//google API Key

function initMap() {
    var center = {lat: 40.7142700, lng: -74.0059700};
    var locations = [
      ['Spiderman<br>\
      New York, NY 90017<br>\
     <a href="">Get Directions</a>',   40.7142700, -74.0059700],
      [],
      [],
      [],
      []
    ];
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: center
    });
  var infowindow =  new google.maps.InfoWindow({});
  var marker, count;
  for (count = 0; count < locations.length; count++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[count][1], locations[count][2]),
        map: map,
        title: locations[count][0]
      });
  google.maps.event.addListener(marker, 'click', (function (marker, count) {
        return function () {
          infowindow.setContent(locations[count][0]);
          infowindow.open(map, marker);
        }
      })(marker, count));
    }
  }

