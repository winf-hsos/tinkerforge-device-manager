var Tinkerforge = require('tinkerforge');
var deviceManager = require('./lib/deviceManager.js');

var connectCallback;

exports.initialize = function (host = "localhost", port = 4223) {
    console.log("Waiting for devices to connect...");

    ipcon = new Tinkerforge.IPConnection();
    deviceManager.setIPConnection(ipcon);
    ipcon.connect(host, port);

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
        function (connectReason) {
            ipcon.enumerate();
        }
    );

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE, _enumerationCallback);
}

exports.setConnectCallback = function (callback) {
    connectCallback = callback;
}

/* Enumeration Types: 0 - Available, 1 - Connected, 2 - Offline (nur USB) */
function _enumerationCallback(uid, connectedUid, position, hardwareVersion, firmwareVersion,
    deviceIdentifier, enumerationType) {

    if (enumerationType == Tinkerforge.IPConnection.ENUMERATION_TYPE_AVAILABLE) {
        var device = deviceManager.add(uid, deviceIdentifier);
        if (typeof connectCallback !== "undefined")
            connectCallback(device);
    }
    else if (enumerationType == Tinkerforge.IPConnection.ENUMERATION_TYPE_CONNECTED) {
        var device = deviceManager.addAgain(uid, deviceIdentifier);
        if (typeof connectCallback !== "undefined")
            connectCallback(device);
    }
    else {
        deviceManager.remove(uid);
    }
}

exports.getDeviceByUid = deviceManager.getDeviceByUid;
exports.getDeviceByIdentifier = deviceManager.getDeviceByIdentifier;