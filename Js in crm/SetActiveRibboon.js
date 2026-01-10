function SetStatusActive(formContext)
{
    alert("Omar");
    var statusAttr = formContext.getAttribute("om_newbookstatus");
    var optionSetValue = 125260002;
    statusAttr.setValue(optionSetValue);  

    statusAttr.setSubmitMode("always");

    formContext.data.save().then(function(){
        alert("Data saved successfully!");
    }).catch(function(error){
        alert("Error: " + error.message);
    });
}

function setActiveER()
{
    return true;
}
