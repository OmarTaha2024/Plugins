function GetFormType(executionContext)
{
    var formContext = executionContext.getFormContext();
var formType = formContext.ui.getFormType();
alert(formType);

}