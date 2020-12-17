function validation() {
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    if (name.value === ""){
        alert("No name? Your message won't send >:(");
        name.focus();
        name.style.border = "red";
        return false;
    }
    if (email.value === ""){
        alert("No email? Your message won't send >:(");
        email.focus();
        email.style.border = "red";
        return false;
    }
    return true;
}
