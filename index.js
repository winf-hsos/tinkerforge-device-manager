var Tinkerforge = require('tinkerforge');
var deviceManager = require('./lib/deviceManager.js');

exports.initialize = function (host = "localhost", port = 4223) {
    console.log("Waiting for devices to connect...");

    ipcon = new Tinkerforge.IPConnection();
    deviceManager.setIPConnection(ipcon);
    ipcon.connect(host, port);

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_CONNECTED,
        function (connectReason) {
            console.log(connectReason);
            ipcon.enumerate();
        }
    );

    ipcon.on(Tinkerforge.IPConnection.CALLBACK_ENUMERATE, _enumerationCallback);
}

/* Enumeration Types: 0 - Available, 1 - Connected, 2 - Offline (nur USB) */
function _enumerationCallback(uid, connectedUid, position, hardwareVersion, firmwareVersion,
    deviceIdentifier, enumerationType) {

    if (enumerationType == Tinkerforge.IPConnection.ENUMERATION_TYPE_AVAILABLE) {
        deviceManager.add(uid, deviceIdentifier)
    }
    else if (enumerationType == Tinkerforge.IPConnection.ENUMERATION_TYPE_CONNECTED) {
        deviceManager.addAgain(uid, deviceIdentifier);
    }
    else {
        deviceManager.remove(uid);
    }
}

exports.getDeviceByUid = deviceManager.getDeviceByUid;
exports.getDeviceByIdentifier = deviceManager.getDeviceByIdentifier;