/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SubmitBoxFailure(clientAPI) {
    const err = clientAPI.actionResults.SubmitBox.error.responseBody;
    const inv = clientAPI.getPageProxy().getClientData().InvDetail;

    let errMsg = "Entry already exist against this";
    if (err.search("License") > 0) {
        errMsg += " License Plate";
        ["LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4"].forEach(element => {
            inv[element] = "";
            clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
        });
    } else if (err.search("Box") > 0) {
        errMsg += " Box Id";
        ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
            inv[element] = "";
            clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
        });
    } else if (err.search("Label") > 0) {
        errMsg += "  Label ID";
        inv.LabelId = "";
        clientAPI.evaluateTargetPath('#Page:Main/#Control:LabelId').setValue("");
    } else {
        errMsg = "An error occurred while processing your request. please try again";
    }

    return clientAPI.executeAction({
        'Name': "/PackedBoxTracking/Actions/FailureMessage.action",
        "Properties": {
            "Message": errMsg
        }
    });
}
