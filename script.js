const states = [
    { name: "Alabama", capital: "Montgomery", image: "images/alabama.png" },
    { name: "Alaska", capital: "Juneau", image: "images/alaska.png" },
    { name: "Arizona", capital: "Phoenix", image: "images/arizona.png" },
    { name: "Arkansas", capital: "Little Rock", image: "images/arkansas.png" },
    { name: "California", capital: "Sacramento", image: "images/california.png" },
    { name: "Colorado", capital: "Denver", image: "images/colorado.png" },
    { name: "Connecticut", capital: "Hartford", image: "images/connecticut.png" },
    { name: "Delaware", capital: "Dover", image: "images/delaware.png" },
    { name: "Florida", capital: "Tallahassee", image: "images/florida.png" },
    { name: "Georgia", capital: "Atlanta", image: "images/georgia.png" },
    { name: "Hawaii", capital: "Honolulu", image: "images/hawaii.png" },
    { name: "Idaho", capital: "Boise", image: "images/idaho.png" },
    { name: "Illinois", capital: "Springfield", image: "images/illinois.png" },
    { name: "Indiana", capital: "Indianapolis", image: "images/indiana.png" },
    { name: "Iowa", capital: "Des Moines", image: "images/iowa.png" },
    { name: "Kansas", capital: "Topeka", image: "images/kansas.png" },
    { name: "Kentucky", capital: "Frankfort", image: "images/kentucky.png" },
    { name: "Louisiana", capital: "Baton Rouge", image: "images/louisiana.png" },
    { name: "Maine", capital: "Augusta", image: "images/maine.png" },
    { name: "Maryland", capital: "Annapolis", image: "images/maryland.png" },
    { name: "Massachusetts", capital: "Boston", image: "images/massachusetts.png" },
    { name: "Michigan", capital: "Lansing", image: "images/michigan.png" },
    { name: "Minnesota", capital: "Saint Paul", image: "images/minnesota.png" },
    { name: "Mississippi", capital: "Jackson", image: "images/mississippi.png" },
    { name: "Missouri", capital: "Jefferson City", image: "images/missouri.png" },
    { name: "Montana", capital: "Helena", image: "images/montana.png" },
    { name: "Nebraska", capital: "Lincoln", image: "images/nebraska.png" },
    { name: "Nevada", capital: "Carson City", image: "images/nevada.png" },
    { name: "New Hampshire", capital: "Concord", image: "images/new_hampshire.png" },
    { name: "New Jersey", capital: "Trenton", image: "images/new_jersey.png" },
    { name: "New Mexico", capital: "Santa Fe", image: "images/new_mexico.png" },
    { name: "New York", capital: "Albany", image: "images/new_york.png" },
    { name: "North Carolina", capital: "Raleigh", image: "images/north_carolina.png" },
    { name: "North Dakota", capital: "Bismarck", image: "images/north_dakota.png" },
    { name: "Ohio", capital: "Columbus", image: "images/ohio.png" },
    { name: "Oklahoma", capital: "Oklahoma City", image: "images/oklahoma.png" },
    { name: "Oregon", capital: "Salem", image: "images/oregon.png" },
    { name: "Pennsylvania", capital: "Harrisburg", image: "images/pennsylvania.png" },
    { name: "Rhode Island", capital: "Providence", image: "images/rhode_island.png" },
    { name: "South Carolina", capital: "Columbia", image: "images/south_carolina.png" },
    { name: "South Dakota", capital: "Pierre", image: "images/south_dakota.png" },
    { name: "Tennessee", capital: "Nashville", image: "images/tennessee.png" },
    { name: "Texas", capital: "Austin", image: "images/texas.png" },
    { name: "Utah", capital: "Salt Lake City", image: "images/utah.png" },
    { name: "Vermont", capital: "Montpelier", image: "images/vermont.png" },
    { name: "Virginia", capital: "Richmond", image: "images/virginia.png" },
    { name: "Washington", capital: "Olympia", image: "images/washington.png" },
    { name: "West Virginia", capital: "Charleston", image: "images/west_virginia.png" },
    { name: "Wisconsin", capital: "Madison", image: "images/wisconsin.png" },
    { name: "Wyoming", capital: "Cheyenne", image: "images/wyoming.png" }
];

let currentStateIndex = 0;
let score = 0;

// Shuffle states for random order
function shuffleStates() {
    for (let i = states.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [states[i], states[j]] = [states[j], states[i]];
    }
}

// Load the state image
function loadStateImage() {
    const canvas = document.getElementById("stateCanvas");
    const ctx = canvas.getContext("2d");
    const state = states[currentStateIndex];

    const img = new Image();
    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Add state name text
        ctx.font = "24px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(state.name, canvas.width / 2, canvas.height - 20);
    };
    img.src = state.image;
}

// Check the player's answer
function checkAnswer() {
    const input = document.getElementById("capitalInput").value.trim();
    const feedback = document.getElementById("feedback");
    const state = states[currentStateIndex];

    if (input.toLowerCase() === state.capital.toLowerCase()) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Try again! The correct answer was ${state.capital}.`;
        feedback.style.color = "red";
    }

    document.getElementById("score").textContent = `Score: ${score}`;
    currentStateIndex++;

    if (currentStateIndex < states.length) {
        loadStateImage();
        document.getElementById("capitalInput").value = "";
    } else {
        feedback.textContent = `Game over! Your final score is ${score}.`;
        document.getElementById("submit").disabled = true;
    }
}

// Initialize the game
document.getElementById("submit").addEventListener("click", checkAnswer);
shuffleStates();
loadStateImage();
