var apiAlert = "Note: Only 5 time per hour it translate."
// alert(apiAlert);

var synth = window.speechSynthesis;
var voices = [];
var voiceList = document.querySelector("#voiceList");
var inputBox = document.querySelector("#input-box");
var outputBox = document.querySelector("#output-box");
var translateBtn = document.querySelector("#translate-btn");
var btnSpeak = document.querySelector('#btnSpeak');
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
translateBtn.addEventListener('click', buttonclickEvent);





// adding functionality to speak
PopulateVoices();
if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

// click event for listen button
btnSpeak.addEventListener('click', () => {
    var toSpeak = new SpeechSynthesisUtterance(outputBox.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
});

function PopulateVoices() {
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice) => {
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}