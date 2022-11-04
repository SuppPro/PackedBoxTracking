/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateBoxData(clientAPI) {

    let data = clientAPI.getPageProxy().getClientData().InvDetail, state = true;

    if (!data) {
        state = false;
    } else {
        let requiredkFields = ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"];
        for (var i = 0; i < requiredkFields.length; i++) {
            if (data[requiredkFields[i]] === undefined || data[requiredkFields[i]] === "") {
                state = false;
                break;
            }
        }
    }
    if (!state) {
        return clientAPI.executeAction({
            'Name': "/PackedBoxTracking/Actions/FailureMessage.action",
            "Properties": {
                "Message": "Please scan all the required stickers to proceed"
            }
        });
    } else {
        return state;
    }
}
