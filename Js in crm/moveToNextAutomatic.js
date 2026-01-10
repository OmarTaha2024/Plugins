function moveToNextStage(executionContext) {
    var formContext = executionContext.getFormContext();

    
    formContext.data.process.moveNext(function(status) {
        if (status === "success") {
            console.log("success");
        }
    });
}