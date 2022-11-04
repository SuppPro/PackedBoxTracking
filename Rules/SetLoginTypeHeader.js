/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SetLoginTypeHeader(clientAPI) {

    let userId= clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
  
    return userId.substring(0, 1).toUpperCase();
}
