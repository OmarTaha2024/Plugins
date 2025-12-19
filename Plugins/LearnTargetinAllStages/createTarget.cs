using Microsoft.Xrm.Sdk;
using System;
using System.Text;

namespace LearnTargetinAllStages
{
    public class createTarget : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // 1) context و tracing
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // 2) نتأكد إن فيه Target
            if (!context.InputParameters.Contains("Target"))
            {
                tracingService.Trace("[PLUGIN DEBUG] No Target in InputParameters");
                return;
            }


            var sb = new StringBuilder();
            sb.AppendLine($"[PLUGIN DEBUG] Message = {context.MessageName}");
            sb.AppendLine($"[PLUGIN DEBUG] Stage = {context.Stage}");


            // 3) لو الرسالة Delete نتعامل مع EntityReference
            //if (string.Equals(context.MessageName, "Delete", StringComparison.OrdinalIgnoreCase))
            //{
            //    var targetRef = context.InputParameters["Target"] as EntityReference;

            //    if (targetRef == null)
            //    {
            //        sb.AppendLine("[PLUGIN DEBUG] Target is not EntityReference in Delete message.");
            //        sb.AppendLine($"[PLUGIN DEBUG] Actual Target type = {targetRef.GetType().FullName}");
            //    }
            //    else
            //    {
            //        sb.AppendLine("[PLUGIN DEBUG] Target (EntityReference) details:");
            //        sb.AppendLine($" - LogicalName = {targetRef.LogicalName}");
            //        sb.AppendLine($" - Id = {targetRef.Id}");
            //    }

            //    tracingService.Trace(sb.ToString());
            //    return; // مهم: نرجع هنا عشان ميدخلش في جزء الـ Entity تحت
            //}

            if (string.Equals(context.MessageName, "Assign", StringComparison.OrdinalIgnoreCase))
            {
                // Target
                var targetOb = context.InputParameters["Target"];
                var targetRef = targetOb as EntityReference;

                if (targetRef != null)
                {
                    sb.AppendLine("[PLUGIN DEBUG] Target (EntityReference) details:");
                    sb.AppendLine($" - LogicalName = {targetRef.LogicalName}");
                    sb.AppendLine($" - Id          = {targetRef.Id}");
                }
                else
                {
                    sb.AppendLine("[PLUGIN DEBUG] Target is NOT EntityReference in Assign message.");
                    sb.AppendLine($"[PLUGIN DEBUG] Target .NET type = {targetOb.GetType().FullName}");
                }


                if (context.InputParameters.Contains("Assignee"))
                {
                    var assigneeObj = context.InputParameters["Assignee"];
                    var assigneeRef = assigneeObj as EntityReference;

                    if (assigneeRef != null)
                    {
                        sb.AppendLine("[PLUGIN DEBUG] Assignee (EntityReference) details:");
                        sb.AppendLine($" - LogicalName = {assigneeRef.LogicalName}");
                        sb.AppendLine($" - Id          = {assigneeRef.Id}");
                    }
                    else
                    {
                        sb.AppendLine("[PLUGIN DEBUG] Assignee is NOT EntityReference.");
                        sb.AppendLine($"[PLUGIN DEBUG] Assignee .NET type = {assigneeObj.GetType().FullName}");
                    }
                }
                else
                {
                    sb.AppendLine("[PLUGIN DEBUG] No 'Assignee' in InputParameters for Assign message.");
                }

                tracingService.Trace(sb.ToString());
                return;
            }

            var targetObj = context.InputParameters["Target"];


            // 4) باقي الرسائل (Create / Update ...) نتعامل مع Entity
            var target = targetObj as Entity;
            if (target == null)
            {
                sb.AppendLine("[PLUGIN DEBUG] Target is not Entity for non-Delete message.");
                sb.AppendLine($"[PLUGIN DEBUG] Actual Target type = {targetObj.GetType().FullName}");
                tracingService.Trace(sb.ToString());
                return;
            }

            sb.AppendLine($"[PLUGIN DEBUG] Target LogicalName = {target.LogicalName}");
            sb.AppendLine($"[PLUGIN DEBUG] Target Id = {target.Id}");
            sb.AppendLine("[PLUGIN DEBUG] Target Attributes:");

            foreach (var attr in target.Attributes)
            {
                sb.AppendLine($" - {attr.Key} = {FormatValue(attr.Value)}");
            }

            tracingService.Trace(sb.ToString());
        }

        private string FormatValue(object value)
        {
            if (value == null)
                return "NULL";

            switch (value)
            {
                case EntityReference er:
                    return $"EntityReference({er.LogicalName}, {er.Id})";

                case OptionSetValue osv:
                    return $"OptionSet({osv.Value})";

                case Money money:
                    return $"Money({money.Value})";

                case DateTime dt:
                    return dt.ToString("yyyy-MM-dd HH:mm:ss");

                case bool b:
                    return b ? "true" : "false";

                case AliasedValue av:
                    return $"AliasedValue({av.AttributeLogicalName} = {FormatValue(av.Value)})";

                default:
                    return value.ToString();
            }
        }

    }
}
