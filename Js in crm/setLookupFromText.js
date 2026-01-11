function setLookupFromText(executionContext) {
    // 1. Get the formContext
    var formContext = executionContext.getFormContext();

    // 2. Get the value from the text field (e.g., "new_accountname_text")
    var accountName = formContext.getAttribute("eveproj_search").getValue(); // Replace with your text field's logical name

    if (accountName) {
        // 3. Use Xrm.WebApi.retrieveMultipleRecords to find the matching record
        // Replace 'account' with your target entity's logical name
        // Replace 'name' with the target entity's primary name field logical name
        var fetchXml = "?$select=eveproj_event1id,eveproj_eventid&$filter=eveproj_eventid eq '" + encodeURIComponent(accountName.trim()) + "'";
         formContext.ui.setFormNotification(accountName,"INFO", "Accountname");
        Xrm.WebApi.retrieveMultipleRecords("eveproj_event1", fetchXml).then(
            function success(result) {
                if (result.entities.length > 0) {
                    // Assuming the first result is the correct one
                    var matchingRecord = result.entities[0];
                    var accountId = matchingRecord.eveproj_event1id;
                    var accountNameResult = matchingRecord.eveproj_eventid;
                    var entityType = "eveproj_event1"; // Replace with your target entity's logical name

                    // 4. Construct the lookup value object
                    var lookupValue = [];
                    lookupValue[0] = {
                        id: accountId,
                        name: accountNameResult,
                        entityType: entityType
                    };

                    // 5. Set the value of the lookup field (e.g., "parentaccountid")
                    // Replace 'parentaccountid' with your lookup field's logical name
                    formContext.getAttribute("eveproj_eventsrollupattendee").setValue(lookupValue);
                } else {
                    // Handle case where no matching record is found
                    formContext.getAttribute("eveproj_eventsrollupattendee").setValue(null);
                    formContext.ui.setFormNotification("No matching account found for the provided name.", "INFO", "nameNotFound");
                }
            },
            function (error) {
                // Handle error conditions
                console.error("Error retrieving records: " + error.message);
                formContext.ui.setFormNotification("Error retrieving records: " + error.message, "ERROR", "apiError");
            }
        );
    } else {
        // Clear the lookup if the text field is empty
        formContext.getAttribute("parentaccountid").setValue(null);
        formContext.ui.clearFormNotification("nameNotFound");
    }
}
