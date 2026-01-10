function PreventRegistration(executionContext) {
    var eventArgs = executionContext.getEventArgs();


    var formContext = executionContext.getFormContext();
    var eventAttribute = formContext.getAttribute("eveproj_eventsrollupattendee");
    var eventLookupValue = eventAttribute.getValue()[0];

    if (
        !eventAttribute ||
        !eventAttribute.getValue() ||
        eventAttribute.getValue().length === 0
    ) {
        alert("Event lookup is empty or undefined");
        return;
    }
    var isSave = false;
    var recordId = eventLookupValue.id.replace("{", "").replace("}", "");
    var recordEntityType = eventLookupValue.entityType;
    alert(recordId);
    var selected = "?$select=eveproj_eventcapacity";
    Xrm.WebApi.retrieveRecord("eveproj_event1", recordId, selected).then(
        function success(result) {
            alert("Ana fl function");
            var capacity = Math.trunc(Number(result["eveproj_eventcapacity"] ?? 0));
            alert(capacity);
            if (capacity <= 0) {
                alert("And Fe Haga 5alt");
                eventArgs.preventDefault();
                alert("prevent");
                alert(isSave);
                Xrm.Navigation.openAlertDialog({
                    Text: "Capacity is full",
                });

            }
        },
        function error(error) {
            alert("Error retrieving event record:", error);
        }
    );

}