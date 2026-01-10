function moveToNextStage(executionContext) {
    var formContext = executionContext.getFormContext();

    var activeStage = formContext.data.process.getActiveStage();

    if ("Registration Open" == activeStage.getName()) {
        var EventStartAttr = formContext.getAttribute("eveproj_eventdate");
        var raw = EventStartAttr.getValue();
        var crmYMD = toYMDLocal(raw);
        var todayYMD = toYMDLocal(new Date());
        alert(crmYMD + "\n"+todayYMD);
        if (crmYMD == todayYMD) {
            safeSetAttr(formContext, "header_process_eveproj_eventstatues", 100000001);
            
            formContext.data.process.moveNext(function success() {
                Xrm.Navigation.openAlertDialog({ text: "This is The Day Of Event" });
            });
        }
    }
}

function toYMDLocal(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
}