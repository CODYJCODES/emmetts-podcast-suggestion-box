// Connect to Socket.IO server
const socket = io(https://memecup.azurewebsites.net);

// Handle form submission
const suggestionForm = document.getElementById('suggestionForm');
const suggestionInput = document.getElementById('suggestionInput');
const suggestionList = document.getElementById('suggestionList');
const submitBtn = document.getElementById('submitBtn');
const toggleBtn = document.getElementById('toggleBtn');

suggestionForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const suggestion = suggestionInput.value.trim();
    if (suggestion !== '') {
        // Send suggestion to server
        socket.emit('new suggestion', suggestion);
        suggestionInput.value = '';
    }
});

// Listen for new suggestions from server
socket.on('new suggestion', (suggestion) => {
    const suggestionItem = document.createElement('li');
    suggestionItem.textContent = suggestion;
    suggestionList.appendChild(suggestionItem);
});

// Toggle visibility of suggestions
toggleBtn.addEventListener('click', () => {
    if (suggestionList.style.display === 'none') {
        suggestionList.style.display = 'block';
    } else {
        suggestionList.style.display = 'none';
    }
});
