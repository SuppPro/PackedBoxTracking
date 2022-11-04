/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateInvoice(clientAPI) {
    const vbeln = clientAPI.getValue();

    if (vbeln.length >= 10) {
        return clientAPI.executeAction({
            'Name': "/PackedBoxTracking/Actions/CheckInvoice.action",
            "Properties": {
                "Target": {
                    "EntitySet": "ValidateInvoiceSet(Vbeln='" + vbeln + "')"
                }
            }
        });
    }
}
