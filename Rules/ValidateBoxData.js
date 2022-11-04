/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateBoxData(clientAPI) {

    const data = clientAPI.getPageProxy().getClientData().InvDetail; 
    let state = true;

    if (!data) {
        state = false;
    } else {
        const reqFields = ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"];
        for (var i = 0; i < reqFields.length; i++) {
            if (data[reqFields[i]] === undefined || data[reqFields[i]] === "") {
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
