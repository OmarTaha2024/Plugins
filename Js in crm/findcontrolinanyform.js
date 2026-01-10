function ShowAllControls(executionContext) {
    var formContext = executionContext.getFormContext();

    var allControls = formContext.ui.controls.get();

    allControls.forEach(function (c) {
        if (c && c.getName) {
            var name = c.getName();
            var label = (c.getLabel && c.getLabel()) ? c.getLabel() : "(no label)";

            alert("Control Name: " + name + "\nLabel: " + label+"\n");
        }
    });
}
