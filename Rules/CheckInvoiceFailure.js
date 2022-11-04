/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CheckInvoiceFailure(clientAPI) {
    let err = clientAPI.actionResults.CheckInvoice.error.responseBody;

    let errMsg = "An error occurred while processing your request";
    if (err.includes("This Invoice no does not exist in SAP system")) {
        errMsg = "Invalid Invoice Number";
    }

    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValidationProperty('ValidationMessage', errMsg);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValidationProperty('ValidationMessageColor', "FF0000");

    clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setEnabled(false);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setValue("");
}
