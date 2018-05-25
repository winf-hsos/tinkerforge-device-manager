var tinkerforge = require('tinkerforge');
var chalk = require('chalk');

/* Load the wrapper classes */
var { Wrapper } = require('./wrapper/Wrapper.js');
var { HumidityV2Wrapper } = require('./wrapper/HumidityV2Wrapper.js');

var _ipcon;
var _devices = new Map();

exports.setIPConnection = function (ipcon) {
    _ipcon = ipcon;
}

exports.add = function (uid, deviceIdentifier, ipcon) {
    var device = _wrapDevice(uid, deviceIdentifier);
    if (typeof device !== "undefined") {
        console.log(chalk.green("Found device >" + device.getName() + "< (UID: " + device.getUID() + "/ DEVICE IDENTIFIER: " + device.getDeviceIdentifier() + ")"));
        _devices.set(uid, device);
    }
}

exports.addAgain = function (uid, deviceIdentifier, ipcon) {
    var device = _wrapDevice(uid, deviceIdentifier);
    if (typeof device !== "undefined") {
        console.log(chalk.green("Re-connected device >" + device.getName() + "< (UID: " + device.getUID() + "/ DEVICE IDENTIFIER: " + device.getDeviceIdentifier() + ")"));
        _devices.set(uid, device);
    }
}

exports.remove = function (uid) {

    if (_devices.has(uid)) {
        var device = _devices.get(uid);
        console.log(chalk.red("Lost device >" + device.getName() + "< (UID: " + device.getUID() + "/ DEVICE IDENTIFIER: " + device.getDeviceIdentifier() + ")"));
        _devices.delete(uid);
    }
}

exports.getDeviceByUid = function (uid) {
    return new Promise((resolve, reject) => {

        var interval = setInterval(() => {
            var checkResult = check();
            if (typeof checkResult !== "undefined") {
                clearInterval(interval);
                resolve(checkResult);
            }
        }, 50);
    });

    function check() {
        if (_devices.has(uid)) {
            return _devices.get(uid);
        }
        else return;
    }
}

function _wrapDevice(uid, deviceIdentifier) {

    var deviceWrapper;

    switch (deviceIdentifier) {
        // Master Brick
        case 13:
            deviceName = "Master Brick";
            device = tinkerforge.BrickMaster(uid, _ipcon);
            // TODO: Implement and replace with specific wrapper for Master Brick
            deviceWrapper = new Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 283:
            deviceName = "Humidity 2.0 Bricklet";
            device = new tinkerforge.BrickletHumidityV2(uid, _ipcon);
            deviceWrapper = new HumidityV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        default:
            console.log(chalk.yellow("Device with device ID >" + deviceIdentifier + "< is not supported yet."));
            break;
    }

    return deviceWrapper;
}