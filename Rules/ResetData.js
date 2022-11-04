/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResetData(clientAPI) {

    clientAPI.getPageProxy().getClientData().InvDetail = {};

    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValue("");

    ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setEnabled(false);
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).clearValidation();
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
    });
}
