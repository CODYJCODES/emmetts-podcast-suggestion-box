// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    databaseURL: "YOUR_DATABASE_URL",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function submitSuggestion() {
    const suggestion = document.getElementById('suggestion').value;
    database.ref('suggestions').push().set({
        suggestion: suggestion
    });
    document.getElementById('suggestion').value = ''; // Clear input field after submission
}

function showAllSuggestions() {
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Clear previous suggestions
    database.ref('suggestions').once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const suggestion = childSnapshot.val().suggestion;
            const suggestionElement = document.createElement('p');
            suggestionElement.textContent = suggestion;
            suggestionsDiv.appendChild(suggestionElement);
        });
    });
}
