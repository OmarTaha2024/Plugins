using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;
using System.Activities;
namespace VatActivity
{
    public class CalculateVatActivity : CodeActivity
    {
        [Input("Amount")]
        [RequiredArgument]
        public InArgument<int> Score { get; set; }


        [Output("Total Amount")]
        public OutArgument<decimal> RealScore { get; set; }
        protected override void Execute(CodeActivityContext context)
        {
            var tracing = context.GetExtension<ITracingService>();
            tracing.Trace("=== Calculate VAT Activity Started ===");

            // Log Inputs
            foreach (var prop in this.GetType().GetProperties())
            {
                if (prop.PropertyType.IsGenericType &&
                    prop.PropertyType.GetGenericTypeDefinition() == typeof(InArgument<>))
                {
                    var value = prop.GetValue(this) as InArgument;
                    tracing.Trace($"Input Argument: {prop.Name} = {value?.Get(context)}");
                }
            }

            var workflowContext = context.GetExtension<IWorkflowContext>();

            tracing.Trace("Workflow Context Info:");
            tracing.Trace($"MessageName: {workflowContext.MessageName}");
            tracing.Trace($"PrimaryEntityName: {workflowContext.PrimaryEntityName}");
            tracing.Trace($"PrimaryEntityId: {workflowContext.PrimaryEntityId}");
            tracing.Trace($"UserId: {workflowContext.UserId}");
            tracing.Trace($"InitiatingUserId: {workflowContext.InitiatingUserId}");
            tracing.Trace($"OrganizationId: {workflowContext.OrganizationId}");
            tracing.Trace($"Depth: {workflowContext.Depth}");
            tracing.Trace($"Stage: {workflowContext.StageName}");
            tracing.Trace($"Mode: {workflowContext.Mode}");
            tracing.Trace($"CorrelationId: {workflowContext.CorrelationId}");


            int amount = Score.Get(context);
            decimal total = amount * 0.2m;
            RealScore.Set(context, total);

            tracing.Trace($"Calculated VAT = {total}");

            tracing.Trace("=== Calculate VAT Activity Finished ===");
        }


    }
}
