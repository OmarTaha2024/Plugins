/*
function openReportForRecord(formContext) {
    var recordId = formContext.data.entity.getId(); 
    var internid = recordId.replace(/[{}]/g, ""); 

    var reportUrl = "https://orgefa5b175.crm4.dynamics.com/crmreports/viewer/viewer.aspx?action=run&id=af4a36cd-69b2-f011-bbd3-7c1e52fbfb8e&helpID=InternReport.rdl&appid=7d550c96-3de3-495c-ac90-6b21fed96d95";
    var newWindow = window.open(reportUrl, "_blank");

    setTimeout(function() {
        var submitbutton = newWindow.document.getElementById("reportViewer_ctl08_ctl00");
        var recordIdField = newWindow.document.getElementById("reportViewer_ctl08_ctl04_txtValue");
            recordIdField.value = internid;
            submitbutton.click();
    }, 2000);
}

function openReportForRecord(formContext) {
    var recordId = formContext.data.entity.getId(); 
    var internid = recordId.replace(/[{}]/g, ""); 

    var reportUrl = "https://orgefa5b175.crm4.dynamics.com/crmreports/viewer/viewer.aspx?action=run&id=af4a36cd-69b2-f011-bbd3-7c1e52fbfb8e&helpID=InternReport.rdl&appid=7d550c96-3de3-495c-ac90-6b21fed96d95";

    window.open(reportUrl, "_blank");
}
*/




function openReportForRecord(formContext) {
    var reportUrl = "https://orgefa5b175.crm4.dynamics.com/crmreports/viewer/viewer.aspx?action=run&id=af4a36cd-69b2-f011-bbd3-7c1e52fbfb8e&helpID=InternReport.rdl&appid=7d550c96-3de3-495c-ac90-6b21fed96d95";
    window.open(reportUrl, "_blank");
}
