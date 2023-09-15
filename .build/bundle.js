(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/PackedBoxTracking/i18n/i18n.properties":
/*!******************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/i18n/i18n.properties ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/AppUpdateFailure.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/AppUpdateFailure.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/PackedBoxTracking/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/AppUpdateSuccess.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/AppUpdateSuccess.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/PackedBoxTracking/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/PackedBoxTracking/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/CheckInvoiceFailure.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/CheckInvoiceFailure.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckInvoiceFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function CheckInvoiceFailure(clientAPI) {
  const err = clientAPI.actionResults.CheckInvoice.error.responseBody;
  let errMsg = "An error occurred while processing your request";
  if (err.search("This Invoice no does not exist") > 0) {
    errMsg = "Invalid Invoice Number";
  } else if (err.search("All items scanned") > 0) {
    errMsg = "All items scanned for the entered invoice number";
  }
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValidationProperty('ValidationMessage', errMsg);
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValidationProperty('ValidationMessageColor', "FF0000");
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').redraw();

  // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').clearValidation();
  // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setEnabled(false);
  // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setValue("");
  // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').redraw();

  clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setEnabled(false);
  clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
  clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').redraw();
  ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
    clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/CheckInvoiceSuccess.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/CheckInvoiceSuccess.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckInvoiceSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function CheckInvoiceSuccess(clientAPI) {
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
  const data = clientAPI.actionResults.CheckInvoice.data._array;
  if (data.length > 0) {
    clientAPI.getPageProxy().getClientData().InvDetail = {
      Vbeln: data[0].Vbeln,
      Matnr: data[0].Matnr,
      BoxQty: data[0].BoxQty,
      Number: data[0].Number
    };

    // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').clearValidation();
    // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setEnabled(true);
    // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').setValue("");
    // clientAPI.evaluateTargetPath('#Page:Main/#Control:BoxId').redraw();

    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setEnabled(true);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').redraw();
  }
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/OnWillUpdate.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/OnWillUpdate.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/PackedBoxTracking/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ResetData.js":
/*!****************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ResetData.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetData)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetData(clientAPI) {
  clientAPI.getPageProxy().getClientData().InvDetail = {
    LicensePlate: undefined
  };
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').clearValidation();
  clientAPI.evaluateTargetPath('#Page:Main/#Control:InvNo').setValue("");
  clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').clearValidation();
  clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
  ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
    clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ResetStickers.js":
/*!********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ResetStickers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetStickers)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ResetStickers(clientAPI) {
  clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
  clientAPI.getPageProxy().getClientData().InvDetail.LicensePlate = undefined;
  ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
    clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ScanSticker.js":
/*!******************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ScanSticker.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScanSticker)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ScanSticker(clientAPI) {
  const scanVal = clientAPI.getValue();
  let match = false;
  if (scanVal) {
    // && scanVal.substring(13) === clientAPI.getPageProxy().getClientData().InvDetail.Matnr.substring(7, 11)
    // && scanVal.substring(14) === clientAPI.getPageProxy().getClientData().InvDetail.Matnr.substring(8, 12)

    if (scanVal.length === 17 || scanVal.length === 18) {
      setStikerValue(clientAPI, "BoxId", scanVal);
      match = true;
    } else if (scanVal.length === 30) {
      if (clientAPI.getPageProxy().getClientData().InvDetail.LicensePlate) {
        if (scanVal.split(":")[0] === clientAPI.getPageProxy().getClientData().InvDetail.LicensePlate) {
          match = true;
        } else {
          match = false;
        }
      } else {
        match = true;
      }
      if (match) {
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
        clientAPI.getPageProxy().getClientData().InvDetail.LicensePlate = scanVal.split(":")[0];
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

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/SetLoginIdHeader.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/SetLoginIdHeader.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetHeaders)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SetHeaders(clientAPI) {
  let userId = clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
  return userId.substring(1, userId.length);
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/SetLoginTypeHeader.js":
/*!*************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/SetLoginTypeHeader.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetLoginTypeHeader)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SetLoginTypeHeader(clientAPI) {
  let userId = clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
  return userId.substring(0, 1).toUpperCase();
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/SubmitBoxFailure.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/SubmitBoxFailure.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SubmitBoxFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SubmitBoxFailure(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ValidateBoxData.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ValidateBoxData.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateBoxData)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateBoxData(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ValidateBoxId.js":
/*!********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ValidateBoxId.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateBoxId)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateBoxId(clientAPI) {
  const boxId = clientAPI.getValue();
  let state;
  clientAPI.getPageProxy().getClientData().InvDetail.BoxId = "";
  clientAPI.clearValidation();
  if (boxId.length === 17) {
    if (boxId.substring(13) !== clientAPI.getPageProxy().getClientData().InvDetail.Matnr.substring(7, 11)) {
      state = false;
    } else {
      state = true;
      clientAPI.getPageProxy().getClientData().InvDetail.BoxId = boxId;
    }
  } else {
    state = false;
  }
  if (!state) {
    clientAPI.setValidationProperty('ValidationMessage', "Invalid Box ID");
    clientAPI.setValidationProperty('ValidationMessageColor', "FF0000");
    clientAPI.setValue("");
    clientAPI.redraw();
  }
  ["LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).clearValidation();
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setEnabled(state);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).redraw();
  });
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ValidateContentLabel.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ValidateContentLabel.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateContentLabel)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateContentLabel(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ValidateInvoice.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ValidateInvoice.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateInvoice)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateInvoice(clientAPI) {
  const vbeln = clientAPI.getValue();
  if (vbeln.length >= 12) {
    return clientAPI.executeAction({
      'Name': "/PackedBoxTracking/Actions/CheckInvoice.action",
      "Properties": {
        "Target": {
          "EntitySet": "ValidateInvoiceSet(Vbeln='" + vbeln + "')"
        }
      }
    });
  } else {
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setEnabled(false);
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').setValue("");
    clientAPI.evaluateTargetPath('#Page:Main/#Control:ScanSticker').redraw();
    ["BoxId", "LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4", "LabelId"].forEach(element => {
      clientAPI.getPageProxy().getClientData().InvDetail[element] = "";
      clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
    });
  }
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Rules/ValidateLicensePlate.js":
/*!***************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Rules/ValidateLicensePlate.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateLicensePlate1)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateLicensePlate1(clientAPI) {
  clientAPI.clearValidation();
  const lp = clientAPI.getValue(),
    licence = lp.split(":");
  let flag,
    inv = clientAPI.getPageProxy().getClientData().InvDetail;
  inv[clientAPI.getName()] = "";
  if (lp.length === 30) {
    const checkField = ["LicensePlate1", "LicensePlate2", "LicensePlate3", "LicensePlate4"];
    const output = checkField.filter(key => inv[key] !== undefined && inv[key] !== "");
    if (output.length > 0) {
      if (licence[0] === inv[output[0]].split(":")[0] && checkLastTwo(clientAPI.getName(), licence[1])) {
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

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Styles/Styles.css":
/*!***************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Styles/Styles.css ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/PackedBoxTracking/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Styles/Styles.less":
/*!****************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Styles/Styles.less ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/PackedBoxTracking/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Styles/Styles.nss":
/*!***************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Styles/Styles.nss ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js":
/*!***********************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/api.js ***!
  \***********************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.7.0/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Pages/Main.page":
/*!*************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Pages/Main.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer1","Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"InvNo","IsEditable":true,"IsVisible":true,"Caption":"Invoice Number","PlaceHolder":"Enter Value","OnValueChange":"/PackedBoxTracking/Rules/ValidateInvoice.js","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"ScanSticker","IsEditable":true,"IsVisible":true,"Caption":"Scan","PlaceHolder":"Scan Sticker","OnValueChange":"/PackedBoxTracking/Rules/ScanSticker.js","KeyboardType":"Default","AlternateInput":"Barcode","Enabled":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"BoxId","IsEditable":true,"IsVisible":true,"Caption":"Box ID","OnValueChange":"/PackedBoxTracking/Rules/ValidateBoxId.js","KeyboardType":"Default","AlternateInput":"None","Enabled":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"LicensePlate1","IsEditable":true,"IsVisible":true,"Caption":"License Plate 1","OnValueChange":"/PackedBoxTracking/Rules/ValidateLicensePlate.js","AlternateInput":"None","Enabled":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"LicensePlate2","IsEditable":true,"IsVisible":true,"Caption":"License Plate 2","OnValueChange":"/PackedBoxTracking/Rules/ValidateLicensePlate.js","AlternateInput":"None","Enabled":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"LicensePlate3","IsEditable":true,"IsVisible":true,"Caption":"License Plate 3","OnValueChange":"/PackedBoxTracking/Rules/ValidateLicensePlate.js","AlternateInput":"None","Enabled":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"LicensePlate4","IsEditable":true,"IsVisible":true,"Caption":"License Plate 4","OnValueChange":"/PackedBoxTracking/Rules/ValidateLicensePlate.js","AlternateInput":"None","Enabled":false},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"LabelId","IsEditable":true,"IsVisible":true,"Caption":"Content Label","OnValueChange":"/PackedBoxTracking/Rules/ValidateContentLabel.js","AlternateInput":"None","Enabled":false}],"Visible":true}],"LoadingIndicator":{"Enabled":true,"Text":""}}],"_Type":"Page","_Name":"Main","Caption":"Box Tracking","ActionBar":{"Items":[{"_Name":"Save","Caption":"Save","SystemItem":"Save","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/PackedBoxTracking/Actions/SubmitBox.action"},{"_Name":"Reset","Caption":"Reset","SystemItem":"Undo","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/PackedBoxTracking/Actions/ResetConfirmation.action"}],"_Name":"ActionBar1"},"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"Signout","Caption":"Sign Out ","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/PackedBoxTracking/Actions/Logout.action"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"PackedBoxTracking","Version":"/PackedBoxTracking/Globals/AppDefinition_Version.global","MainPage":"/PackedBoxTracking/Pages/Main.page","OnLaunch":["/PackedBoxTracking/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/PackedBoxTracking/Rules/OnWillUpdate.js","OnDidUpdate":"/PackedBoxTracking/Actions/Service/InitializeOnline.action","Styles":"/PackedBoxTracking/Styles/Styles.less","Localization":"/PackedBoxTracking/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/PackedBoxTracking/Styles/Styles.css","ios":"/PackedBoxTracking/Styles/Styles.nss","android":"/PackedBoxTracking/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/AppUpdate.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/AppUpdate.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/PackedBoxTracking/Rules/AppUpdateFailure.js","OnSuccess":"/PackedBoxTracking/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/AppUpdateFailureMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/AppUpdateFailureMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/AppUpdateProgressBanner.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/AppUpdateProgressBanner.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/PackedBoxTracking/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/AppUpdateSuccessMessage.action":
/*!************************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/AppUpdateSuccessMessage.action ***!
  \************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/CheckInvoice.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/CheckInvoice.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.Read","ActionResult":{"_Name":"CheckInvoice"},"OnFailure":"/PackedBoxTracking/Rules/CheckInvoiceFailure.js","OnSuccess":"/PackedBoxTracking/Rules/CheckInvoiceSuccess.js","ShowActivityIndicator":true,"ActivityIndicatorText":"","Target":{"Service":"/PackedBoxTracking/Services/TRACKING.service","EntitySet":"ValidateInvoiceSet"}}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/ClosePage.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/ClosePage.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/FailureMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/FailureMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"An error occurred while processing your request. please try again","Title":"Error"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/Logout.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/Logout.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/OnWillUpdate.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/OnWillUpdate.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/ResetConfirmation.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/ResetConfirmation.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"ResetMsgAct"},"Message":"Are you sure ?","Title":"Reset Data","OKCaption":"Yes","OnOK":"/PackedBoxTracking/Rules/ResetData.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnline.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.Initialize","ActionResult":{"_Name":"init"},"OnFailure":"/PackedBoxTracking/Actions/Service/InitializeOnlineFailureMessage.action","OnSuccess":"/PackedBoxTracking/Actions/Service/InitializeOnlineSuccessMessage.action","ShowActivityIndicator":true,"Service":"/PackedBoxTracking/Services/TRACKING.service"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnlineFailureMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/SubmitBox.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/SubmitBox.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"SubmitBox"},"OnFailure":"/PackedBoxTracking/Rules/SubmitBoxFailure.js","OnSuccess":"/PackedBoxTracking/Actions/SubmitSuceessMessage.action","ValidationRule":"/PackedBoxTracking/Rules/ValidateBoxData.js","ShowActivityIndicator":true,"Target":{"Service":"/PackedBoxTracking/Services/TRACKING.service","EntitySet":"BoxDetailsSet"},"Properties":{"BoxId":"#Page:Main/#Control:BoxId/#Value","LicensePlate":"#Page:Main/#ClientData/InvDetail/LicensePlate","InvoiceNo":"#Page:Main/#Control:InvNo/#Value","LabelId":"#Page:Main/#Control:LabelId/#Value","LicensePlate1":"#Page:Main/#Control:LicensePlate1/#Value","LicensePlate2":"#Page:Main/#Control:LicensePlate2/#Value","LicensePlate3":"#Page:Main/#Control:LicensePlate3/#Value","LicensePlate4":"#Page:Main/#Control:LicensePlate4/#Value","BoxQty":"#Page:Main/#ClientData/InvDetail/BoxQty","OkFlag":"","UserName":"","Matnr":"#Page:Main/#ClientData/InvDetail/Matnr"},"Headers":{"loginType":"/PackedBoxTracking/Rules/SetLoginTypeHeader.js","loginId":"/PackedBoxTracking/Rules/SetLoginIdHeader.js"}}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Actions/SubmitSuceessMessage.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Actions/SubmitSuceessMessage.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"SaveMsg"},"Message":"Box data saved successfully","Title":"Success","OnOK":"/PackedBoxTracking/Rules/ResetStickers.js"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Globals/AppDefinition_Version.global":
/*!**********************************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Globals/AppDefinition_Version.global ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Services/TRACKING.service":
/*!***********************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Services/TRACKING.service ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"TRACKING","Headers":{},"OfflineEnabled":false,"SourceType":"Mobile","RestService":false}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let packedboxtracking_actions_appupdate_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/AppUpdate.action */ "./build.definitions/PackedBoxTracking/Actions/AppUpdate.action")
let packedboxtracking_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/AppUpdateFailureMessage.action */ "./build.definitions/PackedBoxTracking/Actions/AppUpdateFailureMessage.action")
let packedboxtracking_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/AppUpdateProgressBanner.action */ "./build.definitions/PackedBoxTracking/Actions/AppUpdateProgressBanner.action")
let packedboxtracking_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/PackedBoxTracking/Actions/AppUpdateSuccessMessage.action")
let packedboxtracking_actions_checkinvoice_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/CheckInvoice.action */ "./build.definitions/PackedBoxTracking/Actions/CheckInvoice.action")
let packedboxtracking_actions_closepage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/ClosePage.action */ "./build.definitions/PackedBoxTracking/Actions/ClosePage.action")
let packedboxtracking_actions_failuremessage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/FailureMessage.action */ "./build.definitions/PackedBoxTracking/Actions/FailureMessage.action")
let packedboxtracking_actions_logout_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/Logout.action */ "./build.definitions/PackedBoxTracking/Actions/Logout.action")
let packedboxtracking_actions_onwillupdate_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/OnWillUpdate.action */ "./build.definitions/PackedBoxTracking/Actions/OnWillUpdate.action")
let packedboxtracking_actions_resetconfirmation_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/ResetConfirmation.action */ "./build.definitions/PackedBoxTracking/Actions/ResetConfirmation.action")
let packedboxtracking_actions_service_initializeonline_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/Service/InitializeOnline.action */ "./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnline.action")
let packedboxtracking_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnlineFailureMessage.action")
let packedboxtracking_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/PackedBoxTracking/Actions/Service/InitializeOnlineSuccessMessage.action")
let packedboxtracking_actions_submitbox_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/SubmitBox.action */ "./build.definitions/PackedBoxTracking/Actions/SubmitBox.action")
let packedboxtracking_actions_submitsuceessmessage_action = __webpack_require__(/*! ./PackedBoxTracking/Actions/SubmitSuceessMessage.action */ "./build.definitions/PackedBoxTracking/Actions/SubmitSuceessMessage.action")
let packedboxtracking_globals_appdefinition_version_global = __webpack_require__(/*! ./PackedBoxTracking/Globals/AppDefinition_Version.global */ "./build.definitions/PackedBoxTracking/Globals/AppDefinition_Version.global")
let packedboxtracking_i18n_i18n_properties = __webpack_require__(/*! ./PackedBoxTracking/i18n/i18n.properties */ "./build.definitions/PackedBoxTracking/i18n/i18n.properties")
let packedboxtracking_jsconfig_json = __webpack_require__(/*! ./PackedBoxTracking/jsconfig.json */ "./build.definitions/PackedBoxTracking/jsconfig.json")
let packedboxtracking_pages_main_page = __webpack_require__(/*! ./PackedBoxTracking/Pages/Main.page */ "./build.definitions/PackedBoxTracking/Pages/Main.page")
let packedboxtracking_rules_appupdatefailure_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/AppUpdateFailure.js */ "./build.definitions/PackedBoxTracking/Rules/AppUpdateFailure.js")
let packedboxtracking_rules_appupdatesuccess_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/AppUpdateSuccess.js */ "./build.definitions/PackedBoxTracking/Rules/AppUpdateSuccess.js")
let packedboxtracking_rules_checkinvoicefailure_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/CheckInvoiceFailure.js */ "./build.definitions/PackedBoxTracking/Rules/CheckInvoiceFailure.js")
let packedboxtracking_rules_checkinvoicesuccess_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/CheckInvoiceSuccess.js */ "./build.definitions/PackedBoxTracking/Rules/CheckInvoiceSuccess.js")
let packedboxtracking_rules_onwillupdate_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/OnWillUpdate.js */ "./build.definitions/PackedBoxTracking/Rules/OnWillUpdate.js")
let packedboxtracking_rules_resetdata_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ResetData.js */ "./build.definitions/PackedBoxTracking/Rules/ResetData.js")
let packedboxtracking_rules_resetstickers_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ResetStickers.js */ "./build.definitions/PackedBoxTracking/Rules/ResetStickers.js")
let packedboxtracking_rules_scansticker_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ScanSticker.js */ "./build.definitions/PackedBoxTracking/Rules/ScanSticker.js")
let packedboxtracking_rules_setloginidheader_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/SetLoginIdHeader.js */ "./build.definitions/PackedBoxTracking/Rules/SetLoginIdHeader.js")
let packedboxtracking_rules_setlogintypeheader_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/SetLoginTypeHeader.js */ "./build.definitions/PackedBoxTracking/Rules/SetLoginTypeHeader.js")
let packedboxtracking_rules_submitboxfailure_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/SubmitBoxFailure.js */ "./build.definitions/PackedBoxTracking/Rules/SubmitBoxFailure.js")
let packedboxtracking_rules_validateboxdata_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ValidateBoxData.js */ "./build.definitions/PackedBoxTracking/Rules/ValidateBoxData.js")
let packedboxtracking_rules_validateboxid_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ValidateBoxId.js */ "./build.definitions/PackedBoxTracking/Rules/ValidateBoxId.js")
let packedboxtracking_rules_validatecontentlabel_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ValidateContentLabel.js */ "./build.definitions/PackedBoxTracking/Rules/ValidateContentLabel.js")
let packedboxtracking_rules_validateinvoice_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ValidateInvoice.js */ "./build.definitions/PackedBoxTracking/Rules/ValidateInvoice.js")
let packedboxtracking_rules_validatelicenseplate_js = __webpack_require__(/*! ./PackedBoxTracking/Rules/ValidateLicensePlate.js */ "./build.definitions/PackedBoxTracking/Rules/ValidateLicensePlate.js")
let packedboxtracking_services_tracking_service = __webpack_require__(/*! ./PackedBoxTracking/Services/TRACKING.service */ "./build.definitions/PackedBoxTracking/Services/TRACKING.service")
let packedboxtracking_styles_styles_css = __webpack_require__(/*! ./PackedBoxTracking/Styles/Styles.css */ "./build.definitions/PackedBoxTracking/Styles/Styles.css")
let packedboxtracking_styles_styles_json = __webpack_require__(/*! ./PackedBoxTracking/Styles/Styles.json */ "./build.definitions/PackedBoxTracking/Styles/Styles.json")
let packedboxtracking_styles_styles_less = __webpack_require__(/*! ./PackedBoxTracking/Styles/Styles.less */ "./build.definitions/PackedBoxTracking/Styles/Styles.less")
let packedboxtracking_styles_styles_nss = __webpack_require__(/*! ./PackedBoxTracking/Styles/Styles.nss */ "./build.definitions/PackedBoxTracking/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	packedboxtracking_actions_appupdate_action : packedboxtracking_actions_appupdate_action,
	packedboxtracking_actions_appupdatefailuremessage_action : packedboxtracking_actions_appupdatefailuremessage_action,
	packedboxtracking_actions_appupdateprogressbanner_action : packedboxtracking_actions_appupdateprogressbanner_action,
	packedboxtracking_actions_appupdatesuccessmessage_action : packedboxtracking_actions_appupdatesuccessmessage_action,
	packedboxtracking_actions_checkinvoice_action : packedboxtracking_actions_checkinvoice_action,
	packedboxtracking_actions_closepage_action : packedboxtracking_actions_closepage_action,
	packedboxtracking_actions_failuremessage_action : packedboxtracking_actions_failuremessage_action,
	packedboxtracking_actions_logout_action : packedboxtracking_actions_logout_action,
	packedboxtracking_actions_onwillupdate_action : packedboxtracking_actions_onwillupdate_action,
	packedboxtracking_actions_resetconfirmation_action : packedboxtracking_actions_resetconfirmation_action,
	packedboxtracking_actions_service_initializeonline_action : packedboxtracking_actions_service_initializeonline_action,
	packedboxtracking_actions_service_initializeonlinefailuremessage_action : packedboxtracking_actions_service_initializeonlinefailuremessage_action,
	packedboxtracking_actions_service_initializeonlinesuccessmessage_action : packedboxtracking_actions_service_initializeonlinesuccessmessage_action,
	packedboxtracking_actions_submitbox_action : packedboxtracking_actions_submitbox_action,
	packedboxtracking_actions_submitsuceessmessage_action : packedboxtracking_actions_submitsuceessmessage_action,
	packedboxtracking_globals_appdefinition_version_global : packedboxtracking_globals_appdefinition_version_global,
	packedboxtracking_i18n_i18n_properties : packedboxtracking_i18n_i18n_properties,
	packedboxtracking_jsconfig_json : packedboxtracking_jsconfig_json,
	packedboxtracking_pages_main_page : packedboxtracking_pages_main_page,
	packedboxtracking_rules_appupdatefailure_js : packedboxtracking_rules_appupdatefailure_js,
	packedboxtracking_rules_appupdatesuccess_js : packedboxtracking_rules_appupdatesuccess_js,
	packedboxtracking_rules_checkinvoicefailure_js : packedboxtracking_rules_checkinvoicefailure_js,
	packedboxtracking_rules_checkinvoicesuccess_js : packedboxtracking_rules_checkinvoicesuccess_js,
	packedboxtracking_rules_onwillupdate_js : packedboxtracking_rules_onwillupdate_js,
	packedboxtracking_rules_resetdata_js : packedboxtracking_rules_resetdata_js,
	packedboxtracking_rules_resetstickers_js : packedboxtracking_rules_resetstickers_js,
	packedboxtracking_rules_scansticker_js : packedboxtracking_rules_scansticker_js,
	packedboxtracking_rules_setloginidheader_js : packedboxtracking_rules_setloginidheader_js,
	packedboxtracking_rules_setlogintypeheader_js : packedboxtracking_rules_setlogintypeheader_js,
	packedboxtracking_rules_submitboxfailure_js : packedboxtracking_rules_submitboxfailure_js,
	packedboxtracking_rules_validateboxdata_js : packedboxtracking_rules_validateboxdata_js,
	packedboxtracking_rules_validateboxid_js : packedboxtracking_rules_validateboxid_js,
	packedboxtracking_rules_validatecontentlabel_js : packedboxtracking_rules_validatecontentlabel_js,
	packedboxtracking_rules_validateinvoice_js : packedboxtracking_rules_validateinvoice_js,
	packedboxtracking_rules_validatelicenseplate_js : packedboxtracking_rules_validatelicenseplate_js,
	packedboxtracking_services_tracking_service : packedboxtracking_services_tracking_service,
	packedboxtracking_styles_styles_css : packedboxtracking_styles_styles_css,
	packedboxtracking_styles_styles_json : packedboxtracking_styles_styles_json,
	packedboxtracking_styles_styles_less : packedboxtracking_styles_styles_less,
	packedboxtracking_styles_styles_nss : packedboxtracking_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/Styles/Styles.json":
/*!****************************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/Styles/Styles.json ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/PackedBoxTracking/jsconfig.json":
/*!***********************************************************!*\
  !*** ./build.definitions/PackedBoxTracking/jsconfig.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map