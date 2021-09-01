var apiAlert = "Note: Only 5 time per hour it translate."
// alert(apiAlert);

var speech = window.speechSynthesis;
var voices = [];
var voiceList = document.querySelector("#voiceList");
var inputBox = document.querySelector("#input-box");
var outputBox = document.querySelector("#output-box");
var translateBtn = document.querySelector("#translate-btn");
var listenBtn = document.querySelector("listen-btn");
var serverUrl = "https://api.funtranslations.com/translate/minion.json";


getVoices();
if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = getVoices;
}

// click event for listen button
function listenBtnClickEvent() {
    var toSpeak = new SpeechSynthesisUtterance(inputBox.value);
    var selectedVoiceName = voiceList.selectedOptions[7].getAttribute('data-name');
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    speech.speak(toSpeak);
}


function getVoices() {
    voices = speech.getVoices();
    voiceList.innerHTML = '';
    voices.forEach((voice) => {
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectIndex = 7;
}




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
translateBtn.addEventListener('click', buttonclickEvent);

// if (listenBtn) {
    listenBtn.addEventListener('click', listenBtnClickEvent);
// }