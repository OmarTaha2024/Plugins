function changeBPFStage(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        if (formContext.data.process) {

             var currentStage = formContext.data.process.getActiveStage();
            
            if (currentStage) {
                var currentStageName = currentStage.getName();
                 alert("Next Stage Name: " + nextStageName);
            }

    formContext.data.process.moveNext(); 

            /*
                                var nextStage = formContext.data.process.getNextStage();
            var currentStage = formContext.data.process.getActiveStage();
            
            if (currentStage) {
                var currentStageName = currentStage.getName();
                    var nextStage = formContext.data.process.getNextStage();
                
                if (nextStage) {
                    var nextStageName = nextStage.getName();
                    alert("Next Stage Name: " + nextStageName);
                } else {
                    alert("No next stage found.");
                }
            } else {
                alert("No active stage found in the current BPF.");
            }

            newStageId
            formContext.data.process.setActiveStage(newStageId);
            console.log("Stage changed to: " + newStageId);
            */
        } else {
            alert("No active Business Process Flow (BPF) found.");
        }
    } catch (error) {
        alert("Error occurred while changing the stage: " + error.message);
    }
}




