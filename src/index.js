var inputBox = document.querySelector("#input-box");
var btn = document.querySelector("#btn");
var outputBox = document.querySelector("#output-box");
var serverUrl = "https://api.funtranslations.com/translate/minion.json";

// function to handle error
function errorHandler(error) {
    console.log("error occured: " + error);
    alert("Some error occured in server! \nplease try again after sometime.");
}

//function to get send query to server for translation
function getTranslationUrl(inputText) {
    var encodedURI = encodeURI(inputText);
    return `${serverUrl}?text=${encodedURI}`;
}

// function to return send query and then return output from server to client
function buttonclickEvent() {
    var inputTxt = inputBox.value;
    // calling server for processing
    fetch(getTranslationUrl(inputTxt))
        .then((response) => response.json())
        .then((json) => {
            var translateText = json.contents.translated;
            outputBox.innerText = translateText;
        })
        .catch(errorHandler);
}

// click event for translation button
btn.addEventListener('click', buttonclickEvent);
