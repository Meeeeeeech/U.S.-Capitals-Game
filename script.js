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
    { name: "New Hampshire", capital: "Concord", image: "images/newhampshire.png" },
    { name: "New Jersey", capital: "Trenton", image: "images/newjersey.png" },
    { name: "New Mexico", capital: "Santa Fe", image: "images/newmexico.png" },
    { name: "New York", capital: "Albany", image: "images/newyork.png" },
    { name: "North Carolina", capital: "Raleigh", image: "images/northcarolina.png" },
    { name: "North Dakota", capital: "Bismarck", image: "images/northdakota.png" },
    { name: "Ohio", capital: "Columbus", image: "images/ohio.png" },
    { name: "Oklahoma", capital: "Oklahoma City", image: "images/oklahoma.png" },
    { name: "Oregon", capital: "Salem", image: "images/oregon.png" },
    { name: "Pennsylvania", capital: "Harrisburg", image: "images/pennsylvania.png" },
    { name: "Rhode Island", capital: "Providence", image: "images/rhodeisland.png" },
    { name: "South Carolina", capital: "Columbia", image: "images/southcarolina.png" },
    { name: "South Dakota", capital: "Pierre", image: "images/southdakota.png" },
    { name: "Tennessee", capital: "Nashville", image: "images/tennessee.png" },
    { name: "Texas", capital: "Austin", image: "images/texas.png" },
    { name: "Utah", capital: "Salt Lake City", image: "images/utah.png" },
    { name: "Vermont", capital: "Montpelier", image: "images/vermont.png" },
    { name: "Virginia", capital: "Richmond", image: "images/virginia.png" },
    { name: "Washington", capital: "Olympia", image: "images/washington.png" },
    { name: "West Virginia", capital: "Charleston", image: "images/westvirginia.png" },
    { name: "Wisconsin", capital: "Madison", image: "images/wisconsin.png" },
    { name: "Wyoming", capital: "Cheyenne", image: "images/wyoming.png" }
];

let currentStateIndex = 0;
let score = 0;

const stateCanvas = document.getElementById("stateCanvas");
const stateNameDiv = document.getElementById("stateName");
const capitalInputDiv = document.getElementById("capitalInput");
const feedbackDiv = document.getElementById("feedback");
const scoreDiv = document.getElementById("score");
const keyboardDiv = document.getElementById("keyboard");

const ctx = stateCanvas.getContext("2d");

function drawStateImage(state) {
    const img = new Image();
    img.src = state.image;
    img.onload = () => {
        ctx.clearRect(0, 0, stateCanvas.width, stateCanvas.height);
        ctx.drawImage(img, 0, 0, stateCanvas.width, stateCanvas.height);
    };
}

function loadNextState() {
    if (currentStateIndex >= states.length) {
        alert("Game over! Your score is: " + score);
        location.reload();
    } else {
        const state = states[currentStateIndex];
        drawStateImage(state);
        stateNameDiv.textContent = state.name;
        capitalInputDiv.textContent = "";
        feedbackDiv.textContent = "";
    }
}

function checkAnswer() {
    const input = capitalInputDiv.textContent.trim().toUpperCase();
    const correctAnswer = states[currentStateIndex].capital.toUpperCase();

    if (input === correctAnswer) {
        feedbackDiv.textContent = "Correct!";
        score++;
        scoreDiv.textContent = `Score: ${score}`;
        currentStateIndex++;
        loadNextState();
    } else {
        feedbackDiv.textContent = "Try again!";
    }
}

function setupKeyboard() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // Add letter keys
    letters.forEach(letter => {
        const key = document.createElement("div");
        key.textContent = letter;
        key.className = "keyboard-key";
        key.addEventListener("click", () => {
            const currentInput = capitalInputDiv.textContent.trim().toUpperCase();
            const correctAnswer = states[currentStateIndex].capital.toUpperCase();

            capitalInputDiv.textContent += letter;

            // Autofill logic
            if (currentInput.length >= 2 && correctAnswer.startsWith(currentInput + letter)) {
                capitalInputDiv.textContent = correctAnswer;
            }
        });
        keyboardDiv.appendChild(key);
    });

    // Add Delete button
    const deleteKey = document.createElement("div");
    deleteKey.textContent = "DELETE";
    deleteKey.className = "keyboard-key keyboard-special";
    deleteKey.addEventListener("click", () => {
        capitalInputDiv.textContent = "";
    });
    keyboardDiv.appendChild(deleteKey);

    // Add Hint button
    const hintKey = document.createElement("div");
    hintKey.textContent = "HINT";
    hintKey.className = "keyboard-key keyboard-special hint";
    hintKey.addEventListener("click", () => {
        const correctAnswer = states[currentStateIndex].capital.toUpperCase();
        capitalInputDiv.textContent = correctAnswer.charAt(0);
    });
    keyboardDiv.appendChild(hintKey);
}

document.getElementById("submit").addEventListener("click", checkAnswer);

setupKeyboard();
loadNextState();
