using Microsoft.Xrm.Sdk;
using System;

namespace LearnTargetinAllStages
{
    public class SetState : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // 1) context و tracing
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            tracingService.Trace("[PLUGIN DEBUG] Message = {0}", context.MessageName);
            tracingService.Trace("[PLUGIN DEBUG] PrimaryEntityName = {0}", context.PrimaryEntityName);

            // 2) قراءة الـ State و Status من الـ InputParameters في رسالة SetState
            OptionSetValue state = null;
            OptionSetValue status = null;

            if (context.InputParameters.Contains("State") &&
                context.InputParameters["State"] is OptionSetValue)
            {
                state = (OptionSetValue)context.InputParameters["State"];
            }

            if (context.InputParameters.Contains("Status") &&
                context.InputParameters["Status"] is OptionSetValue)
            {
                status = (OptionSetValue)context.InputParameters["Status"];
            }

            tracingService.Trace("[PLUGIN DEBUG] State (statecode) = {0}",
                state != null ? state.Value.ToString() : "null");

            tracingService.Trace("[PLUGIN DEBUG] Status (status reason / statuscode) = {0}",
                status != null ? status.Value.ToString() : "null");
        }
    }
}
