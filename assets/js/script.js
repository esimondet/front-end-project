//Marvel API Key
var privKey = "f7b73285d9cec4962b01dc78e356e5b8a0e6b78f";
var pubKey = "d2eac0264cc9a3719ac91f730963a3e8";

// global variables
var markers = [];

var heroList = {
    "heros": []
}

var map = null;

function getHeroData() {

    if ($("#heroName").val() === null || $("#heroName").val() === "") {
        $("#errorMessage").html("You need to enter a hero name!");
        return;
    } else {

        //per API documentation, new timestamp needed with every request
        var ts = new Date().getTime();

        //per terms of use, privKey must be encrypted 
        var hash = CryptoJS.MD5(ts + privKey + pubKey).toString();

        var heroName = $("#heroName").val();

        var url = "https://gateway.marvel.com/v1/public/characters?name=" + heroName;

        var location = null;

        $.getJSON(url, {
            ts: ts,
            apikey: pubKey,
            hash: hash,

        })
            .done(function (data) {
                if (data.data.results.length === 0) {
                    $("#errorMessage").html("That hero is unavailable!");
                    return;
                } else {
                    location = locationAdd();
                }
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
                $("#errorMessage").html("That hero is unavailable! ");
            });
    }

};


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

//On "find hero" click, generate a random location and add this to localstorage array

var locationAdd = function (heroLocation2 = null) {
    if (heroLocation2 == null) {
        var random = new google.maps.LatLng((Math.random() * (85 * 2) - 85), (Math.random() * (180 * 2) - 180));
        var marker = new google.maps.Marker({
            map: map,
            position: random
        });
    }
    else {
        var marker = new google.maps.Marker({
            map: map,
            position: heroLocation2
        });
    }

    markers.push(marker);

    map.setCenter(marker.getPosition());
    var locationMarker = { Lat: marker.position.lat(), Lng: marker.position.lng() };
    return locationMarker;
}

var init = function () {
    //set initial center without hero data

    var center = { lat: 35, lng: 10 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: center,
        mapTypeId: 'satellite',
    });

    // load entities that is saved to localStorage
    window.localStorage.getItem(hero);

    //load marker from local storage
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            var hero = JSON.parse(localStorage.getItem(localStorage.key(i)));
            var heroLocation = hero.location;
            var heroLocation2 = new google.maps.LatLng(heroLocation.Lat, heroLocation.Lng);
            locationAdd(heroLocation2);
        }
    }
}

init();

$(document).on('click', '#heroBtn', function (event) {
    event.preventDefault();
    $("#errorMessage").html("");
    getHeroData();
});

$(document).on('click', '#clearBtn', function (event) {
    $('.card').empty();
    localStorage.clear();
    sessionStorage.clear();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
});