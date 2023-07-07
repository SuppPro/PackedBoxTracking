/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ResetStickers(clientAPI) {
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");

    ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
        clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
    });
}
