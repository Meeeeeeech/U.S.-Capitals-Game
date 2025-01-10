document.addEventListener("DOMContentLoaded", () => {
    const states = [
        { name: "Alabama", capital: "Montgomery" },
        { name: "Alaska", capital: "Juneau" },
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
    const capitalInput = document.getElementById("capitalInput");

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

    document.getElementById("submit").addEventListener("click", () => {
        resetInput();
        currentStateIndex = (currentStateIndex + 1) % states.length;
    });

    // Add event listeners to virtual keyboard buttons
    document.querySelectorAll(".key").forEach((key) => {
        key.addEventListener("click", () => {
            if (!capitalInput.readOnly) { // Only allow input if not locked
                capitalInput.value += key.textContent;
                autoFill();
            }
        });
    });
});
