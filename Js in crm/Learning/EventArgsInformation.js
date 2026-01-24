/* onsave Event */
function EventArgsInformation(executionContext) {
       var eventArgs = executionContext.getEventArgs();
    
    var saveMode = eventArgs.getSaveMode();

    eventArgs.preventDefault();
      if (eventArgs.isDefaultPrevented()) {
        alert("Save has already been cancelled.");
    } else {
        var eventSource = executionContext.getEventSource ? executionContext.getEventSource() : null;
    var message = "Event Source: " + (eventSource) +
        "saveMode : " + (saveMode ) ;

        alert(message);
    }
   
}

/* onchange Event  */
function EventSource(executionContext)
{
 var eventArgs = executionContext;

    if (!eventArgs) {
        console.error("eventArgs is undefined or null");
        return;
    }

    var eventSource = eventArgs.getEventSource ? eventArgs.getEventSource() : null;
    var fieldName = eventSource.getName();
    var fieldValue = eventSource.getValue();
    var message = "Event Source: " + (eventSource ? fieldName : "No Event Source") +
        "Event Source value : " + (eventSource ? fieldValue : "No Event Source") ;
        alert(message);
}