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
    const capitalInput = document.getElementById("capitalInput");
    const stateCanvas = document.getElementById("stateCanvas");
    const ctx = stateCanvas.getContext("2d");

    function loadStateImage(stateName) {
        const img = new Image();
        const stateNameLower = stateName.toLowerCase(); // Convert to lowercase
        img.src = `images/${stateNameLower}.png`; // Path to the state image
        console.log(`Loading image: ${img.src}`); // Debug log for the image path

        img.onload = () => {
            ctx.clearRect(0, 0, stateCanvas.width, stateCanvas.height);
            ctx.drawImage(img, 0, 0, stateCanvas.width, stateCanvas.height);
        };

        img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
        };
    }

    function autoFill() {
        const correctCapital = states[currentStateIndex].capital;
        if (capitalInput.value.toLowerCase() === correctCapital.slice(0, capitalInput.value.length).toLowerCase()) {
            capitalInput.value = correctCapital; // Autofill the remaining characters
            capitalInput.readOnly = true; // Lock the input to prevent further typing
        }
    }

    function resetInput() {
        capitalInput.value = ""; // Clear the input field
        capitalInput.readOnly = false; // Unlock the input for the next round
    }

    function generateKeyboard() {
        const keyboard = document.getElementById("keyboard");
        keyboard.innerHTML = ""; // Clear any existing keyboard buttons
        const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        keys.forEach((key) => {
            const button = document.createElement("button");
            button.textContent = key;
            button.className = "key";
            button.addEventListener("click", () => {
                if (!capitalInput.readOnly) { // Only allow input if not locked
                    capitalInput.value += key;
                    autoFill();
                }
            });
            keyboard.appendChild(button);
        });

        // Add DELETE button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";
        deleteButton.className = "key special";
        deleteButton.addEventListener("click", () => {
            if (!capitalInput.readOnly) {
                capitalInput.value = capitalInput.value.slice(0, -1); // Remove the last letter
            }
        });
        keyboard.appendChild(deleteButton);

        // Add HINT button
        const hintButton = document.createElement("button");
        hintButton.textContent = "HINT";
        hintButton.className = "key special";
        hintButton.addEventListener("click", () => {
            const correctCapital = states[currentStateIndex].capital;
            capitalInput.value = correctCapital.slice(0, capitalInput.value.length + 1); // Reveal the next letter
            autoFill();
        });
        keyboard.appendChild(hintButton);
    }

    function loadNextState() {
        document.getElementById("stateName").textContent = states[currentStateIndex].name;
        loadStateImage(states[currentStateIndex].name);
    }

    document.getElementById("submit").addEventListener("click", () => {
        resetInput();
        currentStateIndex = (currentStateIndex + 1) % states.length;
        loadNextState();
    });

    generateKeyboard();
    loadNextState(); // Load the first state on page load
});
