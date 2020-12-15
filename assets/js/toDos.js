
function addNewToDo() {
    // get input value
    let inputVal = document.getElementById("inputVal").value;

    // check if a value was actually inputted
    if (inputVal === "") {
        alert("You must write something if you want to add it to your toDo-list");
        return false;
    } else {
        // I can assume an actual value was inputted
        let li = document.createElement("li");                // create an li element
        let newContent = document.createTextNode(inputVal);   // Create text node
        li.appendChild(newContent);                           // Ex: <li> Do dishes </li>

        console.log(li);

        let ul = document.getElementById("list");             // get list 
        ul.appendChild(li);                                   // append it to the list                     
    }
}