/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateLicensePlate1(clientAPI) {

    clientAPI.clearValidation();

    const lp = clientAPI.getValue(), licence = lp.split(":");
    let flag, inv = clientAPI.getPageProxy().getClientData().InvDetail;
    inv[clientAPI.getName()] = "";

    if (lp.length === 30) {

        const checkField = ["LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4"];
        const output = checkField.filter(key => inv[key] !== undefined && inv[key] !== "");

        if (output.length > 0) {
            if ((licence[0] === inv[output[0]].split(":")[0]) && checkLastTwo(clientAPI.getName(), licence[1])) {
                flag = true;
            } else {
                flag = false;
            }
        } else if (checkLastTwo(clientAPI.getName(), licence[1])) {
            flag = true;
        } else {
            flag = false;
        }
    } else {
        flag = false;
    }
    if (!flag) {
        clientAPI.setValidationProperty('ValidationMessage', "Invalid " + clientAPI.getCaption());
        clientAPI.setValidationProperty('ValidationMessageColor', "FF0000");
        clientAPI.setValue("");
        clientAPI.redraw();
    } else {
        inv[clientAPI.getName()] = lp;
        inv.LicensePlate = licence[0];
    }
}

function checkLastTwo(name, lastDigit) {
    if (name === "LicensePlate1" && lastDigit !== "ZA") {
        return false;
    } else if (name === "LicensePlate2" && lastDigit !== "ZB") {
        return false;
    } else if (name === "LicensePlate3" && lastDigit !== "ZC") {
        return false;
    } else if (name === "LicensePlate4" && lastDigit !== "ZD") {
        return false;
    } else {
        return true;
    }
}
