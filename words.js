function speak(text) {
    const message = new SpeechSynthesisUtterance(text);
    message.pitch = 1.2;
    message.rate = 1.0;
    window.speechSynthesis.speak(message);
}

function showSentence() {
    const wordMenu = document.getElementById("wordMenu");
    const sentenceBox = document.getelementById("sentenceBox");

    if(wordMenu.selectedIndex > 0) {
        const selectedWord = wordMenu.options[wordMenu.selectedIndex];
        sentenceBox.value = selectedWord.dataset.sentence;
    } else {
        sentenceBox.value = "";
    }
}

function sayWord() {
    const wordMenu = document.getElementById("wordMenu");

    if (wordMenu.selectedIndex > 0) {
        speak(wordMenu.value);
    }
}


function saySentence() {
    const sentenceBox = document.getElementById("sentenceBox");

    if (sentenceBox.value !== "") {
        speak(sentenceBox.value);
    }
}
