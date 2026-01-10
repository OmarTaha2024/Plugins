function lockStatusFieldOnStage(executionContext) {
    var formContext = executionContext.getFormContext();

    var activeStage = formContext.data.process.getActiveStage();
    if (!activeStage) {
        alert("No active stage found.");
        return;
    }



    var stageName = activeStage.getName(); 
    

    var fieldName = "atosint_ominternstatus"; 
    var bpfCtrl = formContext.getControl("header_process_atosint_ominternstatus");
 

/*
   var stepCtrl = formContext.getControl("header_process_atosint_ChangeStatus_Step_22");
    if (stepCtrl) {
        stepCtrl.setVisible(false);
    }
var headerProcessCtrl = formContext.getControl("header_process");
alert(headerProcessCtrl)
if (headerProcessCtrl) {
    headerProcessCtrl.setDisabled(true);
        headerProcessCtrl.setVisible(false);

}
*/

    bpfCtrl.setVisible(false);
    if (stageName === "Om-Active") {
        setFieldLocked(formContext, fieldName, true);  
        } 

        else {
        setFieldLocked(formContext, fieldName, false);
    }
}

function setFieldLocked(formContext, fieldName, shouldLock) {
    var control = formContext.getControl(fieldName);
    if (control) {
        control.setDisabled(shouldLock);
    }

     //control.setVisible(shouldLock);
}
