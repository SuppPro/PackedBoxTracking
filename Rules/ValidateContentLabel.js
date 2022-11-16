/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateContentLabel(clientAPI) {
    const label = clientAPI.getValue();

    clientAPI.getPageProxy().getClientData().InvDetail.LabelId = "";
    clientAPI.clearValidation();

    if (label.length !== 27) {
        clientAPI.setValidationProperty('ValidationMessage', "Invalid Content Label");
        clientAPI.setValidationProperty('ValidationMessageColor', "FF0000");
        clientAPI.setValue("");
        clientAPI.redraw();
    } else {
        clientAPI.getPageProxy().getClientData().InvDetail.LabelId = label;
    }
}
