function GetTabInformation(executionContext) {
    var formContext = executionContext.getFormContext();

    var tab = formContext.ui.tabs.get("Attendees");
    if (tab != null) {
        if (tab.getVisible()) {
            tab.setVisible(false);
        } else {
            tab.setVisible(true);
        }
    }
else
{
    alert("there is no tabs");
}


}