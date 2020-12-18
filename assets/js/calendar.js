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
    // get event from page
    let header = btn.parentNode;
    let event = header.parentNode;

    // get name and date
    let events_handler = event.innerText.split('\n')
    let name = events_handler[0];
    console.log(name);
    let date = events_handler[1];
    console.log(date);

    // search for it
    let events = JSON.parse(localStorage.getItem("events"));
    for(var i = 0; i < events["name"].length; i++){
        console.log("comparing...")
        if (events["name"][i] == name && events["date"][i] == date){
            events["name"].splice(i, 1);
            events["date"].splice(i, 1);
            console.log("found...")

            break;
        }
    }

    let events_serialized = JSON.stringify(events);
    localStorage.setItem("events", events_serialized);

    // remove event from page
    event.remove();
}

function removeFromStorage(name, date){

}

function loadEvents(){
    if (localStorage.getItem("events") === null){
        console.log("not loading...");
        return false;
    } else {
        console.log("loading...");
        let events = JSON.parse(localStorage.getItem("events"));
        for(var i = 0; i < events["name"].length; i++){
            console.log("entry");
            addToEvents(events.name[i], events.date[i]);
            console.log(events.name[i], events.date[i]);
        }
    }
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

function addToStorage(name, date){
    let events;
    if (localStorage.getItem("events") === null){
        events = {
            name: [],
            date: []
        }

    } else {
        events = JSON.parse(localStorage.getItem("events"));
    }

    events.name.push(name);
    events.date.push(date);

    let events_serialized = JSON.stringify(events);

    localStorage.setItem("events", events_serialized);
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

    // ensure there isn't one similar
    let events = JSON.parse(localStorage.getItem("events"));
    if (events !== null){
        for (var item = 0; item < events["name"].length; item++){
            console.log(events["name"][item]);
            console.log(events["date"][item]);
            if (events["name"][item] == inputVal && events["date"][item] == dateVal){
                alert("You already have an event similar to this.");
                return false;
            }
        }
    }

    // add to the page and local storage
    addToEvents(inputVal, dateVal);
    addToStorage(inputVal, dateVal);
}

window.onload = function() {
    loadEvents();
};
