document.addEventListener("touchmove", function(event) {
    if (event.scale !== 1) {
        event.preventDefault(); // Prevent zooming
    }
}, { passive: false });

document.addEventListener("DOMContentLoaded", () => {
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
    const ctx = stateCanvas.getContext("2d");
    const stateNameElement = document.getElementById("stateName");
    const capitalInput = document.getElementById("capitalInput");
    const feedback = document.getElementById("feedback");
    const scoreElement = document.getElementById("score");
    const keyboard = document.getElementById("keyboard");

    function loadState() {
        const state = states[currentStateIndex];
        const img = new Image();
        img.src = state.image;
        img.onload = () => {
            ctx.clearRect(0, 0, stateCanvas.width, stateCanvas.height);
            ctx.drawImage(img, 0, 0, stateCanvas.width, stateCanvas.height);
        };
        stateNameElement.textContent = state.name;
        capitalInput.value = "";
        feedback.textContent = "";
    }

    function checkAnswer() {
        const userAnswer = capitalInput.value.trim().toUpperCase();
        const correctAnswer = states[currentStateIndex].capital.toUpperCase();
        if (userAnswer === correctAnswer) {
            score++;
            feedback.textContent = "Correct!";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Try again!";
            feedback.style.color = "red";
        }
        scoreElement.textContent = `Score: ${score}`;
        currentStateIndex = (currentStateIndex + 1) % states.length;
        setTimeout(loadState, 1000);
    }

    function createKeyboard() {
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        letters.forEach((letter) => {
            const key = document.createElement("button");
            key.textContent = letter;
            key.className = "key";
            key.addEventListener("click", () => {
                capitalInput.value += letter;
                if (capitalInput.value.length >= 3) autoFill();
            });
            keyboard.appendChild(key);
        });

        const deleteKey = document.createElement("button");
        deleteKey.textContent = "DELETE";
        deleteKey.className = "key special";
        deleteKey.addEventListener("click", () => {
            capitalInput.value = capitalInput.value.slice(0, -1);
        });
        keyboard.appendChild(deleteKey);

        const hintKey = document.createElement("button");
        hintKey.textContent = "HINT";
        hintKey.className = "key special";
        hintKey.addEventListener("click", () => {
            const correctAnswer = states[currentStateIndex].capital.toUpperCase();
            capitalInput.value = correctAnswer.charAt(0);
        });
        keyboard.appendChild(hintKey);
    }

    function autoFill() {
        const correctAnswer = states[currentStateIndex].capital.toUpperCase();
        if (correctAnswer.startsWith(capitalInput.value.toUpperCase())) {
            capitalInput.value = correctAnswer;
        }
    }

    document.getElementById("submit").addEventListener("click", checkAnswer);

    createKeyboard();
    loadState();
});
