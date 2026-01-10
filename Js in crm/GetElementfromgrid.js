function refreshSubgridWhenReady(executionContext, callback) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("cc_1761046686316");

    if (subgrid) {
        if (subgrid.getGrid() === null) {
            setTimeout(function () {
                refreshSubgridWhenReady(executionContext, callback);
            }, 4000);
        } else {
            subgrid.refresh();
            callback(subgrid);  
        }
    }
}

function getsubgridData(executionContext) {
    var formContext = executionContext.getFormContext();
    var subgrid = formContext.getControl("cc_1761046686316");
subgrid.addOnLoad(function () {
    
    var grid = subgrid.getGrid();
    if(grid)
    {
  var rows = grid.getRows();
        
        rows.forEach(function(row) {
            var bookName = row.getData().getEntity().attributes.getByName("om_bookname").getValue();
            if (bookName === "CairoBookone") {
                var bookId = row.getData().getEntity().getId();
                alert("CairoBookone Book_ID: " + bookId);
            }
        });
    }
    else
    {
        alert("No Grid");
    }
    /*
    var count = grid.getTotalRecordCount(); 
    alert("Total Element: " + count); */

});
}
