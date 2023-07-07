/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ScanSticker(clientAPI) {
    const scanVal = clientAPI.getValue();

    let match = false;

    if (scanVal) {
        if (scanVal.length === 17 && scanVal.substring(13) === clientAPI.getPageProxy().getClientData().InvDetail.Matnr.substring(7, 11)) {
            setStikerValue(clientAPI, "BoxId", scanVal);
            match = true;
        } else if (scanVal.length === 30) {
            switch (scanVal.split(":")[1]) {
                case "ZA":
                    setStikerValue(clientAPI, "LicensePlate1", scanVal);
                    match = true;
                    break;
                case "ZB":
                    setStikerValue(clientAPI, "LicensePlate2", scanVal);
                    match = true;
                    break;
                case "ZC":
                    setStikerValue(clientAPI, "LicensePlate3", scanVal);
                    match = true;
                    break;
                case "ZD":
                    setStikerValue(clientAPI, "LicensePlate4", scanVal);
                    match = true;
                    break;
            }
        } else if (scanVal.length === 27) {
            setStikerValue(clientAPI, "LabelId", scanVal);
            match = true;
        }

        if (match) {
            clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').clearValidation();
        } else {
            clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValidationProperty('ValidationMessage', "Invalid Sticker");
            clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValidationProperty('ValidationMessageColor', "FF0000");
        }
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
        clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').redraw();
    }
}

function setStikerValue(clientAPI, sticker, val) {
    clientAPI.getPageProxy().getClientData().InvDetail[sticker] = val;
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + sticker).setValue(val);
}
