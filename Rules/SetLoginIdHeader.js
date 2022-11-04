/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SetHeaders(clientAPI) {

    let userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
  
    return userId.substring(1, userId.length);   
}
