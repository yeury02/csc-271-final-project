function addNewEvent() {
    // get input value
    let inputVal = document.getElementById("inputVal").value;
    let dateVal = document.getElementById("dateVal").value;

    console.log(inputVal);
    console.log(dateVal);
    // ensures both values are there
    if (inputVal === "" || dateVal === ""){
        alert("You must have both a description and date to add to Calendar.");
        return false;
    }

    // create event
    let eventDiv = document.createElement("div");
    eventDiv.className = "container";

    // create event description
    let eventDescriptionBox = document.createElement("h3");
    let eventDescription = document.createTextNode(inputVal);

    // create event date
    let eventDate = document.createElement("small");
    let eventDateData = document.createTextNode(dateVal);

    // add both description and date to container
    eventDescriptionBox.appendChild(eventDescription);
    eventDate.appendChild(eventDateData);
    eventDiv.appendChild(eventDescriptionBox);
    eventDiv.appendChild(eventDate);

    // add event to calendar
    let calendar = document.getElementById("calendar");
    calendar.appendChild(eventDiv);
    
}