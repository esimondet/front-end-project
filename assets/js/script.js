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

// we need to take this object function and convert to string so it can store locally
window.localStorage.setItem(hero, JSON.stringify(heroDiv));

// where we store the heroes we searched
var saveHeroes = function() {
    localStorage.setItem("heroess", JSON.stringify(heroes));
}

heroStored.querySelector("stored").textContent = heroBox;
//for hero mispelled: "Looks like that hero is unavailable! Try another"
//for hero bio &/or image blank: if (value = null || "") { display  "CLASSIFIED"}

// function to clear all 
function clearHeroes() {
    localStorage.removeItem("getHeroData");
    localStorage.clear();
    sessionStorage.clear();
}

//$('#clearBtn').click(function()) {
  //  $(".clearheroes").empty();
//}



$(document).on('click', '#clearBtn', function(event) {
    $(".clearheroes").empty();
    localStorage.clear();
    clearHeroes();
    sessionStorage.clear();
})