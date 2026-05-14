// 1) Load the JSON data when page loads
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        buildMenu(data.f1);
    });

// menu for json
function buildMenu(topics) {
    const menu = document.getElementById('topicMenu');

    // loop through each topic in the JSON and create an option for it
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.title;

        if (topic.value) {
            option.textContent = topic.title;
        } else {
            option.textContent = topic.title + "(no audio, has TTS of description)";
        }
        menu.appendChild(option);
    });

    // when user picks a topic, show its content
    menu.addEventListener('change', function() {
        const selected = topics.find(t => t.title === menu.value);
        if (selected) {
            showContent(selected);
        } else {
            clearContent();
        }
    });
}

// display the selected topic's content
function showContent(topic) {
    document.getElementById('topicTitle').textContent = topic.title;
    document.getElementById('topicDescription').textContent = topic.description;

    // show image if applicable
    const img = document.getElementById('topicImage');
    if (topic.image) {
        img.src = topic.image;
        img.alt = topic.title;
        img.style.display = 'block';
    } else {
        img.style.display = 'none';
    }

    // audio button
    const audioBtn = document.getElementById('audioBtn');
    audioBtn.style.display = 'block';
    audioBtn.textContent = 'Play Audio';

    let currentAudio = null;
    let isPlaying = false;

    audioBtn.onclick = function() {
    // If something is already playing, stop it
        if (isPlaying) {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }   

            window.speechSynthesis.cancel();

            isPlaying = false;
            audioBtn.textContent = 'Play Audio';
            return;
        }

    // If topic has an audio file, play that
        if (topic.audio) {
            currentAudio = new Audio(topic.audio);  
            currentAudio.play();

            isPlaying = true;
            audioBtn.textContent = 'Stop Audio';

            currentAudio.onended = function() {
                isPlaying = false;
                audioBtn.textContent = 'Play Audio';
            };
        } 
    // If no audio file, use tts
        else {
            const msg = new SpeechSynthesisUtterance(topic.description);
            window.speechSynthesis.speak(msg);

            isPlaying = true;
            audioBtn.textContent = 'Stop Audio';

            msg.onend = function() {
                isPlaying = false;
                audioBtn.textContent = 'Play Audio';
            };
        }
    };
}

// clear content area when user goes back to default option
function clearContent() {
    document.getElementById('topicTitle').textContent = '';
    document.getElementById('topicDescription').textContent = '';
    document.getElementById('topicImage').style.display = 'none';
    document.getElementById('audioBtn').style.display = 'none';
}