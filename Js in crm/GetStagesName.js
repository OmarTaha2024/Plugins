function getStagesNames(executionContext) {
    try {
        var formContext = executionContext.getFormContext();
        
        if (formContext.data.process) {
            var stageCollection = formContext.data.process.getActivePath();
            
            var stageNamesArray = [];
            var stageIdsArray = [];

            
            stageCollection.forEach(function(stage) {
                var stageName = stage.getName();
                var stageId = stage.getId();
                stageNamesArray.push(stageName);
                stageIdsArray.push(stageId);
            });
             if (stageIdsArray.length > 1) {
                var newStageId = stageIdsArray[1];  // اختر الـ stage الذي ترغب في التبديل إليه

                alert("Stage IDs: " + stageIdsArray.join(", "));
                
                // التحقق من أن الـ newStageId ليس فارغًا أو غير صالح
                if (newStageId) {
                    formContext.data.process.setActiveStage(newStageId, function(status) {
                        if (status === "success") {
                            alert("success");
                        } else if (status === "invalid") {
                            alert("invalid: Stage ID is not valid or reachable.");
                        } else if (status === "unreachable") {
                            alert("unreachable: The stage is not part of the active path.");
                        } else if (status === "dirtyForm") {
                            alert("dirtyForm: The form contains unsaved data.");
                        } else if (status === "preventDefault") {
                            alert("preventDefault: The OnPreStageChange event blocked the stage change.");
                        } else {
                            alert("Error: An unknown error occurred.");
                        }
                    });
                } else {
                    alert("Invalid Stage ID.");
                }
            } else {
                alert("Not enough stages in the active path.");
            }


        } else {
            alert("No active Business Process Flow (BPF) found.");
        }
    } catch (error) {
        alert("Error occurred while fetching stage names: " + error.message);
    }
}
