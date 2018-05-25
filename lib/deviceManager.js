var tinkerforge = require('tinkerforge');
var chalk = require('chalk');

/* Load the wrapper classes */
var { Wrapper } = require('./wrapper/Wrapper.js');
var { AccelerometerWrapper } = require('./wrapper/AccelerometerWrapper.js');
var { HumidityV2Wrapper } = require('./wrapper/HumidityV2Wrapper.js');
var { RGBLEDButtonWrapper } = require('./wrapper/RGBLEDButtonWrapper.js');
var { RGBLEDWrapper } = require('./wrapper/RGBLEDWrapper.js');

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

exports.getDeviceByIdentifier = function (deviceIdentifier) {
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
        var result;
        _devices.forEach((device, uid) => {
            if (device.getDeviceIdentifier() == deviceIdentifier) {
                // Returns the first device found
                result = device;
            }
        });

        return result;
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
        case 250:
            deviceName = "Accelerometer Bricklet";
            device = new tinkerforge.BrickletAccelerometer(uid, _ipcon);
            deviceWrapper = new AccelerometerWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 271:
            deviceName = "RGB LED Bricklet";
            device = new tinkerforge.BrickletRGBLED(uid, _ipcon);
            deviceWrapper = new RGBLEDWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 282:
            deviceName = "RGB Button Bricklet";
            device = new tinkerforge.BrickletRGBLEDButton(uid, _ipcon);
            deviceWrapper = new RGBLEDButtonWrapper(device, uid, deviceIdentifier, deviceName);
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