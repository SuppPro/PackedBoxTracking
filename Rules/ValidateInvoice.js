/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateInvoice(clientAPI) {
    const vbeln = clientAPI.getValue();

    if (vbeln.length >= 12) {
        return clientAPI.executeAction({
            'Name': "/PackedBoxTracking/Actions/CheckInvoice.action",
            "Properties": {
                "Target": {
                    "EntitySet": "ValidateInvoiceSet(Vbeln='" + vbeln + "')"
                }
            }
        });
    } else {
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setEnabled(false);
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').redraw();

        ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
            clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
            clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
        });
    }
}
