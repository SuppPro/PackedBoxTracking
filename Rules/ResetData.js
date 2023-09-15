/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResetData(clientAPI) {

    clientAPI.getPageProxy().getClientData().InvDetail = { LicensePlate: undefined };

    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValue("");

    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");

    ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
        clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
    });
}
