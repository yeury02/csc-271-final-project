function addToEvents(eventName, date) {
    // create event
    let eventDiv = document.createElement("div");
    eventDiv.className = "container";

    // create event description
    let eventDescriptionBox = document.createElement("h3");
    let eventDescription = document.createTextNode(eventName);

    // create event date
    let eventDate = document.createElement("small");
    let eventDateData = document.createTextNode(date);

    // add both description and date to container
    eventDescriptionBox.appendChild(eventDescription);
    eventDate.appendChild(eventDateData);
    eventDiv.appendChild(eventDescriptionBox);
    eventDiv.appendChild(eventDate);

    // find categorization based on date
    let category = eventCategory(date);

    // add event to calendar
    let calendar = document.getElementById(category);
    calendar.appendChild(eventDiv);

}


function eventCategory(date){
    let currentDay = new Date();
    let eventDate = new Date(date);
    if (currentDay > eventDate) {
        return "earlier";
    }

    let weekDaysLater = new Date();
    weekDaysLater.setDate(weekDaysLater.getDate() + 7);

    if (eventDate >= currentDay && eventDate < weekDaysLater){
        return "thisWeek";
    }

    if (eventDate >= weekDaysLater){
        return "later";
    }
}

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

    addToEvents(inputVal, dateVal)    
}