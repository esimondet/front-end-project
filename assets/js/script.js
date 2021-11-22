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
            console.log(heroList);

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
            contentClass.html(hero.bio);

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

//for hero mispelled: "Looks like that hero is unavailable! Try another"
//for hero bio &/or image blank: if (value = null || "") { display  "CLASSIFIED"}