/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CheckInvoiceFailure(clientAPI) {
    const err = clientAPI.actionResults.CheckInvoice.error.responseBody;

    let errMsg = "An error occurred while processing your request";
    if (err.search("This Invoice no does not exist") > 0) {
        errMsg = "Invalid Invoice Number";
    } else if (err.search("All items scanned") > 0) {
        errMsg = "All items scanned for the entered invoice number";
    }

    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValidationProperty('ValidationMessage', errMsg);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValidationProperty('ValidationMessageColor', "FF0000");
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').redraw();

    clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setEnabled(false);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setValue("");
    clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').redraw();
}
