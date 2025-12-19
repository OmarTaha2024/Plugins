using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace LearnTargetinAllStages
{
    public class learnContext : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            var context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            var tracingService = (ITracingService)serviceProvider.GetService(typeof(ITracingService));



            DumpContext(context, tracingService);
        }
        private void DumpContext(IPluginExecutionContext context, ITracingService tracingService)
        {
            var sb = new StringBuilder();

            sb.AppendLine("============== PLUGIN CONTEXT DEBUG ==============");
            sb.AppendLine($"MessageName        : {context.MessageName}");
            sb.AppendLine($"PrimaryEntityName  : {context.PrimaryEntityName}");
            sb.AppendLine($"PrimaryEntityId    : {context.PrimaryEntityId}");
            sb.AppendLine($"Stage              : {context.Stage}");
            sb.AppendLine($"Mode               : {context.Mode}");          // 0 = Sync, 1 = Async
            sb.AppendLine($"Depth              : {context.Depth}");
            sb.AppendLine($"UserId             : {context.UserId}");
            sb.AppendLine($"InitiatingUserId   : {context.InitiatingUserId}");
            sb.AppendLine($"BusinessUnitId     : {context.BusinessUnitId}");
            sb.AppendLine($"CorrelationId      : {context.CorrelationId}");
            sb.AppendLine($"OrganizationId     : {context.OrganizationId}");
            sb.AppendLine($"OrganizationName   : {context.OrganizationName}");
            sb.AppendLine($"IsExecutingOffline : {context.IsExecutingOffline}");
            sb.AppendLine($"IsOfflinePlayback  : {context.IsOfflinePlayback}");
            sb.AppendLine($"IsInTransaction    : {context.IsInTransaction}");
            sb.AppendLine($"IsolationMode      : {context.IsolationMode}");
            sb.AppendLine();

            // Input Parameters
            DumpParameterCollection("InputParameters", context.InputParameters, sb);

            // Output Parameters
            DumpParameterCollection("OutputParameters", context.OutputParameters, sb);

            // Shared Variables
            DumpParameterCollection("SharedVariables", context.SharedVariables, sb);

            // Pre Images
            DumpImageCollection("PreEntityImages", context.PreEntityImages, sb);

            // Post Images
            DumpImageCollection("PostEntityImages", context.PostEntityImages, sb);

            // Parent Context (لو موجود)
            if (context.ParentContext != null)
            {
                sb.AppendLine();
                sb.AppendLine("----- ParentContext.BasicInfo -----");
                sb.AppendLine($"Parent MessageName       : {context.ParentContext.MessageName}");
                sb.AppendLine($"Parent PrimaryEntityName : {context.ParentContext.PrimaryEntityName}");
                sb.AppendLine($"Parent Stage             : {context.ParentContext.Stage}");
                sb.AppendLine($"Parent Depth             : {context.ParentContext.Depth}");
            }

            sb.AppendLine("============== END CONTEXT DEBUG ==============");

            tracingService.Trace(sb.ToString());
        }
        private void DumpParameterCollection(string title, ParameterCollection parameters, StringBuilder sb)
        {
            sb.AppendLine($"----- {title} -----");

            if (parameters == null || parameters.Count == 0)
            {
                sb.AppendLine(" (none)");
                sb.AppendLine();
                return;
            }

            foreach (var kvp in parameters)
            {
                sb.AppendLine($" {kvp.Key} = {FormatValue(kvp.Value)}");
            }

            sb.AppendLine();
        }

        private void DumpImageCollection(string title, EntityImageCollection images, StringBuilder sb)
        {
            sb.AppendLine($"----- {title} -----");

            if (images == null || images.Count == 0)
            {
                sb.AppendLine(" (none)");
                sb.AppendLine();
                return;
            }

            foreach (var kvp in images)
            {
                sb.AppendLine($" Image Name: {kvp.Key}");

                var entity = kvp.Value;
                sb.AppendLine($"  LogicalName: {entity.LogicalName}");
                sb.AppendLine($"  Id         : {entity.Id}");

                foreach (var attr in entity.Attributes)
                {
                    sb.AppendLine($"   - {attr.Key} = {FormatValue(attr.Value)}");
                }

                sb.AppendLine();
            }
        }

        private string FormatValue(object value)
        {
            if (value == null)
                return "NULL";

            switch (value)
            {
                case Entity e:
                    return $"Entity({e.LogicalName}, Id={e.Id}, Attrs={e.Attributes.Count})";

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

                case IEnumerable<object> list:
                    return $"List[{string.Join(", ", list.Select(FormatValue))}]";

                default:
                    return value.ToString();
            }
        }

    }
}
