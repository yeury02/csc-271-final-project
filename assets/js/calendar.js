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

    // add remove button
    let eventRemove = document.createElement("button");
    eventRemove.className = "btn";
    eventRemove.innerHTML = '<i class="fa fa-close"></i>';
    eventRemove.setAttribute("onclick", "removeEvent(this)");
    eventDescriptionBox.appendChild(eventRemove);

    // find categorization based on date
    let category = eventCategory(date);

    // add event to calendar
    let calendar = document.getElementById(category);
    calendar.appendChild(eventDiv);
}

function removeEvent(btn){
    let header = btn.parentNode;
    let event = header.parentNode;

    event.remove();
}

function eventCategory(date){
    let category;
    let currentDay = new Date();
    let eventDate = new Date(date);
    if (currentDay.getTime() >= eventDate.getTime()) {
        category = "earlier";
    }

    let weekDaysLater = new Date();
    weekDaysLater.setDate(weekDaysLater.getDate() + 7);

    if (eventDate.getTime() >= currentDay.getTime() && eventDate.getTime() < weekDaysLater.getTime()){
        category = "thisWeek";
    }

    if (eventDate.getTime() >= weekDaysLater.getTime()){
        category = "later";
    }

    return category;
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