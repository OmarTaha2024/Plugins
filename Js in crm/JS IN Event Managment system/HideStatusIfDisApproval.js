function UnvisibleAttendenceStatusFieldOnStage(executionContext) {
    var formContext = executionContext.getFormContext();
    var activeStage = formContext.data.process.getActiveStage();
    if (!activeStage) {
        alert("No active stage found.");
        return;
    }
    if ("Regesteration" == activeStage.getName() || "Final Stage" == activeStage.getName()) {
        var StatusValue = formContext.getAttribute("eveproj_registrationstatus").getValue();
        var bpfCtrl = formContext.getControl("header_process_eveproj_attendancestatus_1");

        if (StatusValue == 100000002) {
            bpfCtrl.setVisible(false);
        }
        else
        {
            bpfCtrl.setVisible(true);

        }


    }
}