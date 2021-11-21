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

var key = "AIzaSyBZ9SNNQeJbTM160CRva9ziFzo8G1aTxps"

function myMap() {
var mapProp = {
  center:new google.maps.LatLng(51.508742,-0.120850),
  zoom:5,
};
var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
