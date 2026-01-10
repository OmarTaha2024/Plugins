function hideShowTab(executionContext) {
    var formContext = executionContext.getFormContext();
    var tabName = "Feedback"; 
    var fieldName = "eveproj_eventstatues"; 
    var fieldValue = formContext.getAttribute(fieldName).getValue();

    if (fieldValue === 100000002) { 
        formContext.ui.tabs.get(tabName).setVisible(true);
    } 
}
