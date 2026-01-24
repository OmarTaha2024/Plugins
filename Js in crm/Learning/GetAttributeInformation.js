function GetAttributeInformation(executioncontext) {
    var formContext = executioncontext.getFormContext();
    var field = formContext.getAttribute("atosint_ominterstartdate");

    var value = field.getValue();

/* option set 
    var optionSetValue = field.getValue();
    var optionSetText = field.getText();
*/
    //field.setValue("Tes Tes"); 
    /* Set Lookup field
    var lookupValue = [{
     id: "ad38647d-b749-4531-8bd2-94f5c8036c89",  
     name: "Abdallh", // optional 
     entityType: "atosint_omintern"  
 }];
 field.setValue(lookupValue);
 */
   // field.setValue(683020000); option set 
    var dateValue = field.getValue();

     if (dateValue != null) {
        var year = dateValue.getFullYear();
        // getMonth() is 0-indexed, so add 1
        var month = (dateValue.getMonth() + 1).toString().padStart(2, '0');
        var day = dateValue.getDate().toString().padStart(2, '0');

        var formattedDate = day + "/" + month + "/" + year;

        // You can then use this formatted date string as needed
        alert("The formatted date is: " + formattedDate);
let dateString = formattedDate.toString();
        // For example, to display it in a notification or another text field
    } else {
        alert("Date field is empty.");
    }
    var isDirty = field.getIsDirty();
    var isValid = field.isValid();
    // var lookupValue = field.getValue(); 
    //var dateValue = field.getValue();  
//formContext.getAttribute("atosint_ominternstatus").fireOnChange();
    var message =
        "Current value of the field: " + value + "\n" +
        "Is the field valid: " + (isValid ? "Yes" : "No") + "\n" +
        "Has the field been modified: " + (isDirty ? "Yes" : "No") + "\n" +
        "The date value of the field is: " + dateString;
       // "The selected value in the OptionSet is: " + optionSetValue + "\n" +
      //  "The selected Text in the OptionSet is: " + optionSetText + "\n";
    /* get  Lookup Field 
       (lookupValue != null ? 
"A record has been found with ID: " + lookupValue[0].id + 
", Name: " + lookupValue[0].name + 
", Entity Logical Name: " + lookupValue[0].entityType 
: "No related value.") + "\n" ;
*/

    alert(message);


    field.setRequiredLevel("none");


}
