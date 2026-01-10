function UnvisibleStatusFieldOnStageUntilSaving(executionContext) {
    var formContext = executionContext.getFormContext();
        var activeStage = formContext.data.process.getActiveStage();
    if (!activeStage) {
        alert("No active stage found.");
        return;
    }
if("Regesteration" == activeStage.getName())
{
    var bpfCtrl = formContext.getControl("header_process_eveproj_registrationstatus");


     var NameValue = formContext.getAttribute("eveproj_attendanceid").getValue();
     var EmailValue = formContext.getAttribute("eveproj_emailaddress").getValue();
     var EventValue = formContext.getAttribute("eveproj_eventsrollupattendee").getValue();
     var DepartmentValue = formContext.getAttribute("eveproj_attendancedepartment").getValue();

     if(NameValue != null && EmailValue != null && EventValue != null && DepartmentValue != null )
     {
         bpfCtrl.setVisible(true); 
     }
else
{
         bpfCtrl.setVisible(false); 

}


    
        
}
      
}