function MoveBPFStage(executionContext) {
 var formContext = executionContext.getFormContext();
        if (formContext.data.process) {
            formContext.data.process.moveNext(); 
        }
         else {
            alert("No active Business Process Flow (BPF) found.");
        }

}