/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateLicensePlate1(clientAPI) {

    clientAPI.clearValidation();

    let lp = clientAPI.getValue(), flag, inv = clientAPI.getPageProxy().getClientData().InvDetail;
    const licence = lp.split(":");
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
        let msg = clientAPI.getName().split(/(?=[A-Z])/);
        msg[1] = msg[1].split(/(?=[1-4])/).join(" ");
        clientAPI.setValidationProperty('ValidationMessage', "Invalid " + msg.join(" "));
        clientAPI.setValidationProperty('ValidationMessageColor', "FF0000");
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
