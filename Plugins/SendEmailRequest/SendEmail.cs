using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using System;
using System.Collections.Generic;

namespace EmailSender
{
    public class SendEmail : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var tracing = (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            var service = factory.CreateOrganizationService(context.UserId);

            Entity target = context.InputParameters["Target"] as Entity;
            if (target == null) return;


            target = service.Retrieve(
                target.LogicalName,
                target.Id,
               new ColumnSet("eveproj_eventstatues", "eveproj_eventowner", "ownerid", "eveproj_eventid", "eveproj_eventcapacity", "eveproj_expectedattendees", "eveproj_realattendees", "eveproj_averagerate", "eveproj_eventdate", "eveproj_enddate")
                );
            var Owner = (EntityReference)target["ownerid"];

            var EventOwner = (EntityReference)target["eveproj_eventowner"];
            var EventStatus = ((OptionSetValue)target["eveproj_eventstatues"]).Value;
            if (EventStatus == 100000002)
            {
                var fromParty = new Entity("activityparty")
                {
                    ["partyid"] = new EntityReference("systemuser", Owner.Id)
                };

                var toParty = new Entity("activityparty")
                {
                    ["partyid"] = new EntityReference(EventOwner.LogicalName, EventOwner.Id)
                };


                var EventName = target["eveproj_eventid"];
                var EventCapacity = target["eveproj_eventcapacity"];
                var EventExpectedAttendee = target["eveproj_expectedattendees"];
                var EventRealAttendee = target["eveproj_realattendees"];
                var EventAvgfeedback = target["eveproj_averagerate"];
                var EventStartDATE = target["eveproj_eventdate"];
                var EventEndDATE = target["eveproj_enddate"];
                var OwnerName = Owner.Name;
                var EventOwnerName = EventOwner.Name;
                var email = new Entity("email");
                email["subject"] = "Event Summary";
                email["description"] = "<div style='font-family:Segoe UI,Arial,sans-serif;font-size:13px;color:#222;line-height:1.5;'>"
         + "<p>Dear Owner " + EventOwnerName + "This Email is about Closing <b>" + EventName + "</b> event.</p>"
         + "<p>Please find a concise summary:</p>"
         + "<table style='border-collapse:collapse;width:100%;max-width:560px;'>"
           + "<tr><td style='padding:6px 8px;width:180px;color:#555;'>Capacity</td><td style='padding:6px 8px;'><b>" + EventCapacity + "</b></td></tr>"
           + "<tr><td style='padding:6px 8px;color:#555;'>Date </td><td style='padding:6px 8px;'><b>" + EventStartDATE + "-" + EventEndDATE + "</b></td></tr>"
           + "<tr><td style='padding:6px 8px;color:#555;'>Expected Attendance</td><td style='padding:6px 8px;'><b>" + EventExpectedAttendee + "</b></td></tr>"
           + "<tr><td style='padding:6px 8px;color:#555;'>Actual Attendance</td><td style='padding:6px 8px;'><b>" + EventRealAttendee + "</b></td></tr>"
           + "<tr><td style='padding:6px 8px;color:#555;'>Average Feedback</td><td style='padding:6px 8px;'><b>" + EventAvgfeedback + "</b></td></tr>"
         + "</table>"
         + "<p>Best regards,<br>" + OwnerName + "<br>"
       + "</div>";
                email["directioncode"] = true;
                email["to"] = new EntityCollection(new List<Entity> { toParty });
                email["from"] = new EntityCollection(new List<Entity> { fromParty });

                var emailId = service.Create(email);
                service.Execute(new SendEmailRequest
                {
                    EmailId = emailId,
                    IssueSend = true
                });
            }


        }
    }
}
