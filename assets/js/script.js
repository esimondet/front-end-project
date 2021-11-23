//Marvel API Key
var privKey = "f7b73285d9cec4962b01dc78e356e5b8a0e6b78f";
var pubKey = "d2eac0264cc9a3719ac91f730963a3e8";

function getHeroData() {

    //per API documentation, new timestamp needed with every request
    var ts = new Date().getTime();
    //per terms of use, privKey must be encrypted 
    var hash = CryptoJS.MD5(ts + privKey + pubKey).toString();

    var heroName = $("#heroName").val();

    var url = "https://gateway.marvel.com/v1/public/characters?name=" + heroName;

    $.getJSON(url, {
        ts: ts,
        apikey: pubKey,
        hash: hash,

    })
        .done(function (data) {

            var hero = {
                "name": data.data.results[0].name,
                "bio": data.data.results[0].description,
                "imageUrl": data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension,
            }

            heroList.heros.push(hero);

            //Bulma documentation found on https://bulma.io/documentation/components/card/

            var heroDiv = $("<div class='card'>");

            //hero profile picture
            var cardContentDiv = $("<div class='card-content'>");
            var mediaDiv = $("<div class='media'>");
            var mediaLeftDiv = $("<div class='media-left'>");
            var heroFigure = $("<figure class='image is-48x48'>");
            var heroImg = $("<img src='" + hero.imageUrl + "' alt='" + hero.name + " thumbnail'>");

            heroFigure.append(heroImg);
            mediaLeftDiv.append(heroFigure);
            mediaDiv.append(mediaLeftDiv);
            

            //hero name
            var mediaTitleDiv = $("<div class='media-content'>");
            var titleP = $("<p class='title is-4'>");
            titleP.text(hero.name);

            mediaTitleDiv.append(titleP);
            mediaDiv.append(mediaTitleDiv);
            cardContentDiv.append(mediaDiv);

            //hero bio
            var contentClass = $("<div class='content'>");
            cardContentDiv.append(contentClass);
            
            if (hero.bio != null && hero.bio != "") {
                contentClass.html(hero.bio);
            } else {
                contentClass.html("Classified"); 
            }
            
            //final assembly

            heroDiv.append(cardContentDiv);

            $("#heroGen").append(heroDiv);

            // saving entities to localStorage
            localStorage.setItem(heroName, JSON.stringify(hero));

        })
        .fail(function (err) {
            console.log(err); //error codes found on developer.marvel.com
        });


};

$(document).on('click', '#heroBtn', function (event) {
    event.preventDefault();
    getHeroData();
})

var heroList = {
    "heros": []
}

// conditional to check if there is anything in localStorage
if (localStorage.length > 0) {
    for ( var i = 0; i < localStorage.length; i++) {
    var hero = JSON.parse(localStorage.getItem(localStorage.key(i)));
    
    heroList.heros.push(hero);

    //Bulma documentation found on https://bulma.io/documentation/components/card/

    var heroDiv = $("<div class='card'>");

    //hero profile picture
    var cardContentDiv = $("<div class='card-content'>");
    var mediaDiv = $("<div class='media'>");
    var mediaLeftDiv = $("<div class='media-left'>");
    var heroFigure = $("<figure class='image is-48x48'>");
    var heroImg = $("<img src='" + hero.imageUrl + "' alt='" + hero.name + " thumbnail'>");

    heroFigure.append(heroImg);
    mediaLeftDiv.append(heroFigure);
    mediaDiv.append(mediaLeftDiv);
    

    //hero name
    var mediaTitleDiv = $("<div class='media-content'>");
    var titleP = $("<p class='title is-4'>");
    titleP.text(hero.name);

    mediaTitleDiv.append(titleP);
    mediaDiv.append(mediaTitleDiv);
    cardContentDiv.append(mediaDiv);

    //hero bio
    var contentClass = $("<div class='content'>");
    cardContentDiv.append(contentClass);
    
    if (hero.bio != null && hero.bio != "") {
        contentClass.html(hero.bio);
    } else {
        contentClass.html("Classified"); 
    }
    
    //final assembly

    heroDiv.append(cardContentDiv);

    $("#heroGen").append(heroDiv);
    }
}

// load entities that is saved to localStorage
window.localStorage.getItem(hero);

$(document).on('click', '#clearBtn', function(event) {
    $('.card').empty();
    localStorage.clear();
    sessionStorage.clear();
})



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
