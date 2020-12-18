function validateForm() {
    var fields = ["name" , "email", "phone-number", "message"];
    var i, l = fields.length;
    var fieldname;
    for (i = 0; i < l; i++) {
        fieldname = fields[i];
        if (document.forms["myForm"][fieldname].value === "") {
            document.forms["myForm"][fieldname].style.border = "1px solid red";
            alert(fieldname + " can not be empty");
            return false;
        }
    }
    return true;
}
