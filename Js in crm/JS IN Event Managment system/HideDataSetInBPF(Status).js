function UnvisibleStatusFieldOnStage(executionContext) {
    var formContext = executionContext.getFormContext();
        var activeStage = formContext.data.process.getActiveStage();
    if (!activeStage) {
        alert("No active stage found.");
        return;
    }
      var bpfCtrl = formContext.getControl("header_process_eveproj_attendancestatus");
         bpfCtrl.setVisible(false); 
        
}