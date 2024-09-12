document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded");
    const generateButton = document.getElementById('generate_button');

    generateButton.onclick = function() {
        console.log("Button clicked");
        window.location.href = 'loading.html';

    }
});