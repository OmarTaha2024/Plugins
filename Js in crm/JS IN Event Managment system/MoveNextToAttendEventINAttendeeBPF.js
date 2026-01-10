function MoveNextAtEventDate(executionContext) {


       var formContext = executionContext.getFormContext();
var activeStage = formContext.data.process.getActiveStage();


if("Waiting For Event Data" == activeStage.getName())
{
     var EventAttr = formContext.getAttribute("eveproj_eventsrollupattendee"); 
    if (EventAttr != null && EventAttr.getValue() != null && EventAttr.getValue().length > 0) 
    {
        var EventlookupValue = EventAttr.getValue()[0]; 

        var recordId = EventlookupValue.id.replace(/[{}]/g, ""); 
        var recordEntityType = EventlookupValue.entityType;
var selected = "?$select=eveproj_eventdate";
Xrm.WebApi.retrieveRecord(recordEntityType, recordId,selected).then(
        function success(result) {
           var raw = result.eveproj_eventdate;             
  var crmYMD = raw.slice(0, 10);                   
var todayYMD = new Date(Date.now()).toISOString().slice(0,10); 

  if (crmYMD == todayYMD) {
   formContext.data.process.moveNext(function success() {
    Xrm.Navigation.openAlertDialog({ text: "This is The Day Of Event" });
  }, function failure(error) {
    var msg = (error && error.message) ? error.message : ("" + error);
    Xrm.Navigation.openAlertDialog({ text: "Failed to move stage: " + msg });
  }); 
  } else {
    Xrm.Navigation.openAlertDialog({ text: crmYMD + " : This is The Date Of Event." });
    alert();
  }});
}}
   
}