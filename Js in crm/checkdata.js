function preventSaveIfDatesInvalid(executionContext) {

    const form = executionContext.getFormContext();
  const args = executionContext.getEventArgs();


  const START = "atosint_ominterstartdate";
  const END   = "atosint_ominterenddate";
const startVal = form.getAttribute(START)?.getValue();
const endVal   = form.getAttribute(END)?.getValue();

  const s = new Date(startVal); 
const e = new Date(endVal);

if (e.getTime() < s.getTime())
{
    args.preventDefault();
  var alertStrings = { 
    confirmButtonLabel: "Ok", 
    text: "End Date is Not Valid", 
    title: "Warning"
};
    var alertOptions = { 
    height: 120, 
    width: 450 
};
    Xrm.Navigation.openAlertDialog(alertStrings,alertOptions);
}

}