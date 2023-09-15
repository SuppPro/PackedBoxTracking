/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SubmitBoxFailure(clientAPI) {

    const err = clientAPI.actionResults.SubmitBox.error.responseBody,
        errString = err.split("message")[2].split(",")[0],
        error = errString.substring(3, errString.length - 1);
    // errString = JSON.parse(err);

    return clientAPI.executeAction({
        'Name': "/PackedBoxTracking/Actions/FailureMessage.action",
        "Properties": {
            "Message": error
        }
    });
}
