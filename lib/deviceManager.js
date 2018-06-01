var tinkerforge = require('tinkerforge');
var chalk = require('chalk');

/* Load the wrapper classes */
var { Wrapper } = require('./wrapper/Wrapper.js');
var { AccelerometerWrapper } = require('./wrapper/AccelerometerWrapper.js');
var { AmbientLightV2Wrapper } = require('./wrapper/AmbientLightV2Wrapper.js');
var { HumidityV2Wrapper } = require('./wrapper/HumidityV2Wrapper.js');
var { NFCWrapper } = require('./wrapper/NFCWrapper.js');
var { OLEDDisplayWrapper } = require('./wrapper/OLEDDisplayWrapper.js');
var { OutdoorWeatherWrapper } = require('./wrapper/OutdoorWeatherWrapper.js');
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
        console.log(chalk.green("Found device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")"));
        _devices.set(uid, device);
    }
    return device;
}

exports.addAgain = function (uid, deviceIdentifier, ipcon) {
    var device = _wrapDevice(uid, deviceIdentifier);
    if (typeof device !== "undefined") {
        console.log(chalk.green("Re-connected device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")"));
        _devices.set(uid, device);
    }
    return device;
}

exports.remove = function (uid) {

    if (_devices.has(uid)) {
        var device = _devices.get(uid);
        console.log(chalk.red("Lost device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")"));
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
        case 259:
            deviceName = "Ambient Light 2.0 Bricklet";
            device = new tinkerforge.BrickletAmbientLightV2(uid, _ipcon);
            deviceWrapper = new AmbientLightV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 263:
            deviceName = "OLED 128x64 Display Bricklet";
            device = new tinkerforge.BrickletOLED128x64(uid, _ipcon);
            deviceWrapper = new OLEDDisplayWrapper(device, uid, deviceIdentifier, deviceName);
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
        case 286:
            deviceName = "NFC Bricklet";
            device = new tinkerforge.BrickletNFC(uid, _ipcon);
            deviceWrapper = new NFCWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 288:
            deviceName = "Outdoor Weather Bricklet";
            device = new tinkerforge.BrickletOutdoorWeather(uid, _ipcon);
            deviceWrapper = new OutdoorWeatherWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        default:
            console.log(chalk.yellow("Device with device ID >" + deviceIdentifier + "< is not supported yet."));
            break;
    }

    return deviceWrapper;
}