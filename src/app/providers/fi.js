additionalSignUpFields: [{
    name: "First_Name",
    placeholder: "enter your First Name",
    // The following properties are optional
    validator: function (name) {
        return {
            valid: name.length >= 6,
            hint: "Must have 6 or more chars" // optional
        };
    }
},
{
    name: "Last_Name",
    placeholder: "enter your Last Name",
    // The following properties are optional
    validator: function (name) {
        return {
            valid: name.length >= 6,
            hint: "Must have 6 or more chars" // optional
        };
    }
},
{
    name: "Phone_Number",
    placeholder: "enter your phone number",
    // The following properties are optional
    validator: function (name) {
        return {
            valid: name.length >= 6,
            hint: "Must have 6 or more chars" // optional
        };
    }
}]
