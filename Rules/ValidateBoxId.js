/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateBoxId(clientAPI) {
    const boxId = clientAPI.getValue();
    let state;

    clientAPI.getPageProxy().getClientData().InvDetail.BoxId = "";
    clientAPI.clearValidation();

    if (boxId.length === 17) {
        if (boxId.substring(13) !== clientAPI.getPageProxy().getClientData().InvDetail.Matnr.substring(7, 11)) {
            state = false;
        } else {
            state = true;
            clientAPI.getPageProxy().getClientData().InvDetail.BoxId = boxId;
        }
    } else {
        state = false;
    }
    if (!state) {
        clientAPI.setValidationProperty('ValidationMessage', "Invalid Box ID");
        clientAPI.setValidationProperty('ValidationMessageColor', "FF0000");
        clientAPI.setValue("");
        clientAPI.redraw();
    }
    ["LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).clearValidation();
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setEnabled(state);
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).redraw();
    });
}
