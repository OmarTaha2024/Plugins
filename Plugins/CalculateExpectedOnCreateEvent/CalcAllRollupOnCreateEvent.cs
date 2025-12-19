using Microsoft.Crm.Sdk.Messages;
using Microsoft.Xrm.Sdk;
using System;

namespace CalculateExpectedOnCreateEvent
{
    public class CalcAllRollupOnCreateEvent : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);
            ITracingService tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            try
            {
                if (context.MessageName != "Create" || !context.OutputParameters.Contains("id"))
                    return;

                tracingService.Trace("Create plugin triggered.");

                Guid newId = (Guid)context.OutputParameters["id"];
                string rollupExpectedAttendees = "eveproj_expectedattendees";
                string rollupRealAttendees = "eveproj_realattendees";
                string rollupAvgAttendanceRate = "eveproj_averagerate";


                var calcRollupExpectedAttendees = new CalculateRollupFieldRequest
                {
                    Target = new EntityReference("eveproj_event1", newId),
                    FieldName = rollupExpectedAttendees
                };
                service.Execute(calcRollupExpectedAttendees);

                var calcRollupRealAttendees = new CalculateRollupFieldRequest
                {
                    Target = new EntityReference("eveproj_event1", newId),
                    FieldName = rollupRealAttendees
                };
                service.Execute(calcRollupRealAttendees);

                var calcRollupAvgRate = new CalculateRollupFieldRequest
                {
                    Target = new EntityReference("eveproj_event1", newId),
                    FieldName = rollupAvgAttendanceRate
                };
                service.Execute(calcRollupAvgRate);
            }
            catch (Exception ex)
            {
                tracingService.Trace("Exception: " + ex.Message);
                throw new InvalidPluginExecutionException("Error in CalcAllRollupOnCreateEvent: " + ex.Message);
            }
        }
    }
}
