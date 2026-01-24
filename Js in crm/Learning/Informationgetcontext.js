function getcontextInformation(executionContext) {
    var context = executionContext.getContext();
    
    var userId = context.getUserId();
    var userName = context.getUserName();

    var orgName = context.getOrgUniqueName();
    
  // var appName = context.getAppName();

    var clientUrl = context.getClientUrl();
    
    //var clientType = context.getClient(); not suppoted 
    
    var userRoles = context.getUserRoles().join(", ");
    
   // var language = context.getLanguage(); not supported
    

    var message = "User ID: " + userId + "\n" +
                  "User Name: " + userName + "\n" +
                  "Organization Name: " + orgName + "\n" +
                //  "App Name: " + appName + "\n" +
                  "Client URL: " + clientUrl + "\n" +
                  //"Client Type: " + clientType + "\n" +
                  "User Roles: " + userRoles + "\n" ;
                 // "Language: " + language;
    

    alert(message);
}
