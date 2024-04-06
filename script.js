const firebaseConfig = {
    apiKey: "AIzaSyBwf8QvoCea5zKAt7brg4WR-lqRBOTnIzs",
    authDomain: "emmett-s-podcast-thing.firebaseapp.com",
    projectId: "emmett-s-podcast-thing",
    storageBucket: "emmett-s-podcast-thing.appspot.com",
    databaseURL: "https://emmett-s-podcast-thing-default-rtdb.firebaseio.com",
    messagingSenderId: "16094210024",
    appId: "1:16094210024:web:1ca59271fb6b9327dde65d"
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.database();

// Function to submit a suggestion
function submitSuggestion() {
    const suggestion = document.getElementById('suggestion').value.trim();
    if (suggestion !== '') {
        database.ref('suggestions').push().set({
            suggestion: suggestion
        });
        document.getElementById('suggestion').value = '';
        alert('Suggestion submitted successfully!');
    } else {
        alert('Please enter a suggestion before submitting.');
    }
}

// Function to show all suggestions
function showAllSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions
    database.ref('suggestions').once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((childSnapshot) => {
                const suggestion = childSnapshot.val().suggestion;
                const suggestionElement = document.createElement('p');
                suggestionElement.textContent = suggestion;
                suggestionsDiv.appendChild(suggestionElement);
            });
        } else {
            suggestionsDiv.textContent = 'No suggestions available.';
        }
    });
}

// Function to handle key press event (submit suggestion when Enter is pressed)
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitSuggestion();
    }
}

// Event listeners
document.getElementById('submitBtn').addEventListener('click', submitSuggestion);
document.getElementById('showBtn').addEventListener('click', showAllSuggestions);
document.getElementById('suggestion').addEventListener('keypress', handleKeyPress);

