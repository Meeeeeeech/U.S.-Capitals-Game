document.addEventListener("DOMContentLoaded", () => {
    const states = [
        { name: "Alabama", capital: "Montgomery" },
        { name: "Alaska", capital: "Juneau" },
        { name: "Arizona", capital: "Phoenix" },
        { name: "Arkansas", capital: "Little Rock" },
        { name: "California", capital: "Sacramento" },
        { name: "Colorado", capital: "Denver" },
        { name: "Connecticut", capital: "Hartford" },
        { name: "Delaware", capital: "Dover" },
        { name: "Florida", capital: "Tallahassee" },
        { name: "Georgia", capital: "Atlanta" },
        { name: "Hawaii", capital: "Honolulu" },
        { name: "Idaho", capital: "Boise" },
        { name: "Illinois", capital: "Springfield" },
        { name: "Indiana", capital: "Indianapolis" },
        { name: "Iowa", capital: "Des Moines" },
        { name: "Kansas", capital: "Topeka" },
        { name: "Kentucky", capital: "Frankfort" },
        { name: "Louisiana", capital: "Baton Rouge" },
        { name: "Maine", capital: "Augusta" },
        { name: "Maryland", capital: "Annapolis" },
        { name: "Massachusetts", capital: "Boston" },
        { name: "Michigan", capital: "Lansing" },
        { name: "Minnesota", capital: "Saint Paul" },
        { name: "Mississippi", capital: "Jackson" },
        { name: "Missouri", capital: "Jefferson City" },
        { name: "Montana", capital: "Helena" },
        { name: "Nebraska", capital: "Lincoln" },
        { name: "Nevada", capital: "Carson City" },
        { name: "New Hampshire", capital: "Concord" },
        { name: "New Jersey", capital: "Trenton" },
        { name: "New Mexico", capital: "Santa Fe" },
        { name: "New York", capital: "Albany" },
        { name: "North Carolina", capital: "Raleigh" },
        { name: "North Dakota", capital: "Bismarck" },
        { name: "Ohio", capital: "Columbus" },
        { name: "Oklahoma", capital: "Oklahoma City" },
        { name: "Oregon", capital: "Salem" },
        { name: "Pennsylvania", capital: "Harrisburg" },
        { name: "Rhode Island", capital: "Providence" },
        { name: "South Carolina", capital: "Columbia" },
        { name: "South Dakota", capital: "Pierre" },
        { name: "Tennessee", capital: "Nashville" },
        { name: "Texas", capital: "Austin" },
        { name: "Utah", capital: "Salt Lake City" },
        { name: "Vermont", capital: "Montpelier" },
        { name: "Virginia", capital: "Richmond" },
        { name: "Washington", capital: "Olympia" },
        { name: "West Virginia", capital: "Charleston" },
        { name: "Wisconsin", capital: "Madison" },
        { name: "Wyoming", capital: "Cheyenne" }
    ];

    let currentStateIndex = 0;
    let score = 0;
    const gameContainer = document.getElementById("game");

    function loadStateImage(stateName) {
        const canvas = document.getElementById("stateCanvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const stateNameLower = stateName.toLowerCase().replace(/\s/g, "");
        img.src = `images/${stateNameLower}.png`;

        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
        };
    }

    function autoFill() {
        const input = document.getElementById("capitalInput");
        const correctCapital = states[currentStateIndex].capital;

        if (input.value.toLowerCase() === correctCapital.slice(0, input.value.length).toLowerCase()) {
            if (input.value.length === 3) {
                input.value = correctCapital;
                input.readOnly = true;
            }
        }
    }

    function resetInput() {
        const input = document.getElementById("capitalInput");
        input.value = "";
        input.readOnly = false;
    }

    function updateScoreDisplay() {
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.textContent = `Score: ${score}`;
    }

    function generateKeyboard() {
        const keyboard = document.getElementById("keyboard");
        keyboard.innerHTML = "";
        const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

        keys.forEach((key) => {
            const button = document.createElement("button");
            button.textContent = key;
            button.className = "key";
            button.addEventListener("click", () => {
                const input = document.getElementById("capitalInput");
                if (!input.readOnly) {
                    input.value += key;
                    autoFill();
                }
            });
            keyboard.appendChild(button);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        deleteButton.className = "key special";
        deleteButton.addEventListener("click", () => {
            const input = document.getElementById("capitalInput");
            if (!input.readOnly) {
                input.value = input.value.slice(0, -1);
            }
        });
        keyboard.appendChild(deleteButton);

        const hintButton = document.createElement("button");
        hintButton.textContent = "HINT";
        hintButton.className = "key special";
        hintButton.addEventListener("click", () => {
            const input = document.getElementById("capitalInput");
            const correctCapital = states[currentStateIndex].capital;
            input.value = correctCapital.charAt(0);
        });
        keyboard.appendChild(hintButton);
    }

    function endGame() {
        gameContainer.innerHTML = `
            <div style="text-align: center; position: absolute; top: 50%; transform: translateY(-50%);">
                <h1 style="font-size: 3rem; margin: 20px 0;">GAME OVER</h1>
                <p style="font-size: 2rem; font-weight: bold; color: red; margin: 20px 0;">Final Score: ${score}</p>
                <button id="tryAgain" style="padding: 15px 30px; font-size: 1.5rem; color: white; background-color: green; border: none; cursor: pointer; border-radius: 5px;">
                    TRY AGAIN
                </button>
            </div>
        `;

        document.getElementById("tryAgain").addEventListener("click", restartGame);
    }

    function restartGame() {
        currentStateIndex = 0;
        score = 0;
        gameContainer.innerHTML = `
            <div id="score" style="font-size: 1.5rem; margin: 10px;">Score: 0</div>
            <canvas id="stateCanvas" width="600" height="400"></canvas>
            <div id="stateName" style="font-size: 2rem; font-weight: bold;"></div>
            <div id="inputArea">
                <input type="text" id="capitalInput" placeholder="Enter the capital" readonly />
                <button id="submit">Submit</button>
            </div>
            <div id="keyboard"></div>
        `;
        initializeGame();
    }

    function loadNextState() {
        if (currentStateIndex >= states.length) {
            endGame();
            return;
        }
        document.getElementById("stateName").textContent = states[currentStateIndex].name;
        loadStateImage(states[currentStateIndex].name);
        resetInput();
    }

    function initializeGame() {
        generateKeyboard();
        const submitButton = document.getElementById("submit");
        submitButton.addEventListener("click", () => {
            const input = document.getElementById("capitalInput");
            const correctCapital = states[currentStateIndex].capital;

            if (input.value.toLowerCase() === correctCapital.toLowerCase()) {
                score++;
                updateScoreDisplay();
            }
            currentStateIndex++;
            loadNextState();
        });
        loadNextState();
        updateScoreDisplay(); // Reset score display on initialization
    }

    initializeGame();
});
