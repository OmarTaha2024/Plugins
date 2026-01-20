using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Xrm.Sdk.Metadata;
using Microsoft.Xrm.Sdk.Workflow;
using System;
using System.Activities;
using System.Linq;

namespace AttributeMetaData
{
    public class AttributeMetaData : CodeActivity
    {
        protected override void Execute(CodeActivityContext context)
        {
            // الحصول على خدمة التتبع والسياق
            var tracing = context.GetExtension<ITracingService>();
            IWorkflowContext executionContext = context.GetExtension<IWorkflowContext>();
            IOrganizationServiceFactory serviceFactory = context.GetExtension<IOrganizationServiceFactory>();
            IOrganizationService service = serviceFactory.CreateOrganizationService(executionContext.UserId);

            // تحديد الكيان والحقل
            string entityName = "atosint_omintern";
            string attributeName = "atosint_ommentor";

            // إنشاء استعلام RetrieveAttributeRequest
            RetrieveAttributeRequest request = new RetrieveAttributeRequest
            {
                EntityLogicalName = entityName,
                LogicalName = attributeName
            };

            // تنفيذ الاستعلام
            RetrieveAttributeResponse response = (RetrieveAttributeResponse)service.Execute(request);

            // الوصول إلى بيانات الحقل
            AttributeMetadata attributeMetadata = response.AttributeMetadata;

            // طباعة كافة التفاصيل داخل Response وAttributeMetadata
            tracing.Trace("--------------- Response Results ---------------");
            foreach (var result in response.Results)
            {
                tracing.Trace(result.Key + ": " + result.Value);
            }

            // طباعة التفاصيل داخل الـ AttributeMetadata
            tracing.Trace("--------------- AttributeMetadata ---------------");
            tracing.Trace("Schema Name: " + attributeMetadata.SchemaName);
            tracing.Trace("Attribute Type: " + attributeMetadata.AttributeType);
            tracing.Trace("Required Level: " + attributeMetadata.RequiredLevel);
            tracing.Trace("Is Global: " + attributeMetadata.IsGlobalFilterEnabled);
            tracing.Trace("Is Valid for Create: " + attributeMetadata.IsValidForCreate);
            tracing.Trace("Is Valid for Update: " + attributeMetadata.IsValidForUpdate);
            tracing.Trace("Is Valid for Read: " + attributeMetadata.IsValidForRead);
            tracing.Trace("Is Audit Enabled: " + attributeMetadata.IsAuditEnabled);
            tracing.Trace("Display Name: " + attributeMetadata.DisplayName.UserLocalizedLabel?.Label);

            if (attributeMetadata is EnumAttributeMetadata optionSetMetadata)
            {
                tracing.Trace("OptionSet values:");
                foreach (var option in optionSetMetadata.OptionSet.Options)
                {
                    tracing.Trace($"Option Value: {option.Value}, Label: {option.Label.UserLocalizedLabel?.Label}");
                }
            }

            // إذا كان الحقل من نوع Lookup، طباعة كيان الارتباط
            if (attributeMetadata is LookupAttributeMetadata lookupMetadata)
            {
                var targetEntity = lookupMetadata.Targets.FirstOrDefault();
                tracing.Trace("Associated Entity for Lookup: " + targetEntity);

                RetrieveEntityRequest retrieveEntityRequest = new RetrieveEntityRequest
                {
                    EntityFilters = EntityFilters.All, // استرجاع كافة البيانات الوصفية
                    LogicalName = targetEntity
                };

                // استرجاع الـ Entity data 
                RetrieveEntityResponse retrieveEntityResponse = (RetrieveEntityResponse)service.Execute(retrieveEntityRequest);
                tracing.Trace("Associated Entity Metadata: " + retrieveEntityResponse.EntityMetadata.SchemaName);

                // 3. Get the metadata from the response
                EntityMetadata entityMetadata = retrieveEntityResponse.EntityMetadata;

                // 4. Use the retrieved metadata (e.g., print properties)
                Console.WriteLine($"Schema Name: {entityMetadata.SchemaName}");
                Console.WriteLine($"Display Name: {entityMetadata.DisplayName.UserLocalizedLabel.Label}");
                Console.WriteLine($"Number of Attributes: {entityMetadata.Attributes.Length}");
                Console.WriteLine($"PrimaryNameAttribute: {entityMetadata.PrimaryNameAttribute}");
            }

        }

    }
}

