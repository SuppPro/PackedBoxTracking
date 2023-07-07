/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CheckInvoiceSuccess(clientAPI) {
    
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
    
    const data = clientAPI.actionResults.CheckInvoice.data._array;
    if (data.length > 0) {

        clientAPI.getPageProxy().getClientData().InvDetail = {
            Vbeln: data[0].Vbeln,
            Matnr: data[0].Matnr,
            BoxQty: data[0].BoxQty,
            Number: data[0].Number
        };

        // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').clearValidation();
        // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setEnabled(true);
        // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setValue("");
        // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').redraw();

        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setEnabled(true);
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').redraw();
    }
}
