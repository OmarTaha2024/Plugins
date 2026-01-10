function filterLookupBasedOnOptionSet(executionContext) {
    var formContext = executionContext.getFormContext();
    
    // Get the value of the Option Set field
    var optionSetValue = formContext.getAttribute("eveproj_attendancedepartment").getValue();

    // Get the lookup control
  var lookupControl = formContext.getControl("eveproj_eventsrollupattendee");

    // Remove any existing filter to prevent duplication
    //lookupControl.removePreSearch(addLookupFilter);

    if (optionSetValue !== null) {
        lookupControl.setVisible(true);
        // Add the filter if an option is selected
        lookupControl.addPreSearch(addLookupFilter);
    }
    else
    {
        lookupControl.setVisible(false);
    }
}

function addLookupFilter(executionContext) {
    var formContext = executionContext.getFormContext();
    var optionSetValue = formContext.getAttribute("eveproj_attendancedepartment").getValue();
    
    if (optionSetValue !== null) {
        // Construct the FetchXML condition part. 
        // The value should match the value on the target entity records you want to show.
    
var fetchXmlFilter = "<filter type='and'>" +
                     "<condition attribute='eveproj_eventdepartment' operator='eq' value='" + optionSetValue + "' />" +
                     "</filter>";


        // Apply the custom filter to the lookup field
        formContext.getControl("eveproj_eventsrollupattendee").addCustomFilter(fetchXmlFilter, "eveproj_event1");
    }
}
