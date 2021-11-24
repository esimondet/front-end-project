//Marvel API Key
var privKey = "f7b73285d9cec4962b01dc78e356e5b8a0e6b78f";
var pubKey = "d2eac0264cc9a3719ac91f730963a3e8";

function getHeroData(location=null) {

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
                "location": location,
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

var heroList = {
    "heros": []
}

// conditional to check if there is anything in localStorage
if (localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
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

        //load map pins



    }
}

// load entities that is saved to localStorage
window.localStorage.getItem(hero);

$(document).on('click', '#clearBtn', function (event) {
    $('.card').empty();
    localStorage.clear();
    sessionStorage.clear();
})



//google API Key

function initMap() {

    //set initial center without hero data

    var center = { lat: 35, lng: 10 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: center,
        mapTypeId: 'satellite',
    });
    
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var hero = JSON.parse(localStorage.getItem(localStorage.key(i))); 
            var heroLocation = hero.location;
            var heroLocation2 = new google.maps.LatLng(heroLocation.Lat, heroLocation.Lng);
            var marker = new google.maps.Marker ({
                map: map,
                position: heroLocation2
            });
        }
    }


    //On "find hero" click, generate a random location and add this to localstorage array

    var locationAdd = function () {
        var random = new google.maps.LatLng((Math.random() * (85*2) - 85), (Math.random() * (180*2)-180));
        var marker = new google.maps.Marker ({
            map: map,
            position: random
        });
        map.setCenter(marker.getPosition());
        var locationMarker = {Lat: marker.position.lat(), Lng: marker.position.lng()};
     //   localStorage[ + ' location'] = JSON.stringify(locationMarker);
        return locationMarker;
    }

    //save marker to local storage


    $(document).on('click', '#heroBtn', function (event) {
        var location = locationAdd();
        event.preventDefault();
        getHeroData(location);
    });
}
