
function addNewToDo() {
    // get input value
    let inputVal = document.getElementById("inputVal").value;

    // check if a value was actually inputted
    if (inputVal === "") {
        alert("You must write something if you want to add it to your toDo-list");
        return false;
    } else {
        // recreat below --> <li><span><i class="fas fa-trash-alt"></i></span> Example </li>
        let li = document.createElement("li");                
        let span = document.createElement("span")
        let i = document.createElement("i");
        i.setAttribute("class", "fas fa-trash-alt");  
        
        let newContent = document.createTextNode(" " + inputVal);   

        span.appendChild(i); 
        li.appendChild(span);
        li.appendChild(newContent);

        let ul = document.getElementById("list");             
        ul.appendChild(li);                                                    
    }
}

let ul = document.getElementById('list');
ul.addEventListener('click', function(event) {
    let target = event.target.tagName;
    // check if the element clicked is an li
    if (target === 'LI'){
        // css class
        ul.classList.toggle("completed");
        alert(event.target.innerHTML);
      }
});