function addNewToDo() {
    // get input value
    let inputVal = document.getElementById("inputVal").value;

    // check if a value was actually inputted
    if (inputVal === "") {
        alert("You must write something if you want to add it to your toDo-list");
    } else {
        // recreate below --> <li><span><i class="fas fa-trash-alt"></i></span> Example </li>
        let li = document.createElement("li");                
        let span = document.createElement("span");
        let i = document.createElement("i");
        i.setAttribute("class", "fas fa-trash-alt"); 
        li.setAttribute("class", "toDo-li");
        
        let newContent = document.createTextNode(" " + inputVal);   

        span.appendChild(i); 
        li.appendChild(span);
        li.appendChild(newContent);

        let ul = document.getElementById("list");             
        ul.appendChild(li);   
    }
}

$(document).ready(function(){

    // jQuery methods go here...

    // this is much easier to set an li to completed than plain Vanilla Js
    $("ul").on("click", "li.toDo-li", function(){
        $(this).toggleClass("completed");
    });

    // removes the li completely from the ToDo-list
    $("ul").on("click", "span", function(event){
        $(this).parent().fadeOut(500,function(){
            $(this).remove();
        });
        event.stopPropagation();
    });
});