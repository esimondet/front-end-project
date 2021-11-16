//Marvel API Key
var privKey = "f7b73285d9cec4962b01dc78e356e5b8a0e6b78f";
var pubKey = "d2eac0264cc9a3719ac91f730963a3e8";

function getMarvelResponse() {

    //per API documentation, new timestamp needed with every request
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + privKey + pubKey).toString();

    var characterID = "1009718"; //temporary place holder, wolverine
    
    var url = "https://gateway.marvel.com:443/v1/public/characters/" + characterID;

    console.log(url);
    $.getJSON(url, {
        ts: ts,
        apikey: pubKey,
        hash: hash
        
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function(err) {
        console.log(err); //error codes found on developer.marvel.com
    });
};

getMarvelResponse();

//https://gateway.marvel.com:443/v1/public/characters/1009718?apikey=d2eac0264cc9a3719ac91f730963a3e8
