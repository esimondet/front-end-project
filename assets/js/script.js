// const request= require("request-promise");
// const cheerio= require("cheerio");

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
                "placeOfOriginUrl": data.data.results[0].urls[1].url.split("?")[0].replace('(', '').replace(')', '').replace(/_/g, '-').replace('universe', 'characters') + '/in-comics'
            }

            heroList.heros.push(hero);

            // request(hero.placeOfOriginUrl, error, response, html) => {
            //     if (!error && response.statusCode == 200) {
            //         const $= cherio.load(html);

            //     }
            // }
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

//next step scrape

//https://gateway.marvel.com:443/v1/public/characters?name=hulk&apikey=d2eac0264cc9a3719ac91f730963a3e8
//https://gateway.marvel.com:433/v1/public/characters?name=hulk&ts=1637102859893&apikey=d2eac0264cc9a3719ac91f730963a3e8&hash=83ea153556699b9a1027a3e058859bb2
