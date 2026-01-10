function retrieveOmmentor(executionContext) {


       var formContext = executionContext.getFormContext();
       /* ensure that field Is Empty */
        var mentorAttr = formContext.getAttribute("atosint_ommentor");
        var currentMentor = mentorAttr.getValue();
    if (currentMentor && currentMentor.length > 0) { return; }


    var InternAttr = formContext.getAttribute("atosint_omrelatedintern"); 
    if (InternAttr != null && InternAttr.getValue() != null && InternAttr.getValue().length > 0) 
    {
        var internlookupValue = InternAttr.getValue()[0]; 

        var recordId = internlookupValue.id.replace(/[{}]/g, ""); 
        var recordEntityType = internlookupValue.entityType;
var selected = "?$select=_atosint_ommentor_value";
Xrm.WebApi.retrieveRecord(recordEntityType, recordId,selected).then(
        function success(result) {
         var atosint_ommentor = result["_atosint_ommentor_value"]; 
    var atosint_ommentor_formatted = result["_atosint_ommentor_value@OData.Community.Display.V1.FormattedValue"];
    var atosint_ommentor_lookuplogicalname = result["_atosint_ommentor_value@Microsoft.Dynamics.CRM.lookuplogicalname"];


        var mentorLookupAttr = formContext.getAttribute("atosint_ommentor"); 
    if (!mentorLookupAttr) throw new Error("Task form doesn't have 'atosint_ommentor' attribute.");

    mentorLookupAttr.setValue([{
      id: "{" + atosint_ommentor + "}",                
      name: atosint_ommentor_formatted || "",                  
      entityType:atosint_ommentor_lookuplogicalname          
    }]);
    mentorLookupAttr.setSubmitMode("always");


    return formContext.data.save();
    },
    function (error) {
        var alertStrings = { 
    confirmButtonLabel: "Ok", 
    text: error.message, 
    title: "Error"
};
    var alertOptions = { 
    height: 120, 
    width: 450 
};
    Xrm.Navigation.openAlertDialog(alertStrings,alertOptions);
    }
);}
   else
    {
        var alertStrings = { 
    confirmButtonLabel: "Ok", 
    text: "There is No intern Here", 
    title: "Warning"
};
    var alertOptions = { 
    height: 120, 
    width: 450 
};
    Xrm.Navigation.openAlertDialog(alertStrings,alertOptions);
    }
}
