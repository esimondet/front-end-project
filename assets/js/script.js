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
                "bio": data.data.results[0].description,
                "imageUrl": data.data.results[0].thumbnail.path + '.' + data.data.results[0].thumbnail.extension,
            }

            heroList.heros.push(hero);
            console.log(heroList);
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