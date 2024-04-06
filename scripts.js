// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwf8QvoCea5zKAt7brg4WR-lqRBOTnIzs",
    authDomain: "emmett-s-podcast-thing.firebaseapp.com",
    projectId: "emmett-s-podcast-thing",
    storageBucket: "emmett-s-podcast-thing.appspot.com",
    databaseURL: "https://emmett-s-podcast-thing-default-rtdb.firebaseio.com",
    messagingSenderId: "16094210024",
    appId: "1:16094210024:web:1ca59271fb6b9327dde65d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function submitSuggestion() {
    const suggestion = document.getElementById('suggestion').value.trim(); // Trim any leading or trailing whitespace
    if (suggestion !== '') {
        database.ref('suggestions').push().set({
            suggestion: suggestion
        });
        document.getElementById('suggestion').value = ''; // Clear input field after submission
        alert('Suggestion submitted successfully!');
    } else {
        alert('Please enter a suggestion before submitting.');
    }
}

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

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitSuggestion();
    }
}
