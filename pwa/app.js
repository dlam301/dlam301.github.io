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
        option.textContent = topic.title;
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
    if (topic.audio) {
        audioBtn.style.display = 'block';
        audioBtn.onclick = function() {
            const sound = new Audio(topic.audio);
            sound.play();
        };
    } else {
        // some dont have audio like downforce and etc, so TTS for description
        audioBtn.style.display = 'block';
        audioBtn.onclick = function() {
            const msg = new SpeechSynthesisUtterance(topic.description);
            window.speechSynthesis.speak(msg);
        };
    }
}

// clear content area when user goes back to default option
function clearContent() {
    document.getElementById('topicTitle').textContent = '';
    document.getElementById('topicDescription').textContent = '';
    document.getElementById('topicImage').style.display = 'none';
    document.getElementById('audioBtn').style.display = 'none';
}