var tinkerforge = require('tinkerforge');
var chalk = require('chalk');

/* Load the wrapper classes */
var { Wrapper } = require('./wrapper/Wrapper.js');
var { AccelerometerWrapper } = require('./wrapper/AccelerometerWrapper.js');
var { AirQualityWrapper } = require('./wrapper/AirQualityWrapper.js');
var { AmbientLightV2Wrapper } = require('./wrapper/AmbientLightV2Wrapper.js');
var { BarometerWrapper } = require('./wrapper/BarometerWrapper.js');
var { BarometerV2Wrapper } = require('./wrapper/BarometerV2Wrapper.js');
var { CO2Wrapper } = require('./wrapper/CO2Wrapper.js');
var { DustDetectorWrapper } = require('./wrapper/DustDetectorWrapper.js');
var { DistanceIRWrapper } = require('./wrapper/DistanceIRWrapper.js');
var { DistanceUSWrapper } = require('./wrapper/DistanceUSWrapper.js');
var { GPSV2Wrapper } = require('./wrapper/GPSV2Wrapper.js');
var { HumidityV2Wrapper } = require('./wrapper/HumidityV2Wrapper.js');
var { LCD128x64DisplayWrapper } = require('./wrapper/LCD128x64DisplayWrapper.js');
var { MotionDetectorV2Wrapper } = require('./wrapper/MotionDetectorV2Wrapper.js');
var { NFCWrapper } = require('./wrapper/NFCWrapper.js');
var { OLEDDisplayWrapper } = require('./wrapper/OLEDDisplayWrapper.js');
var { OutdoorWeatherWrapper } = require('./wrapper/OutdoorWeatherWrapper.js');
var { PiezoSpeakerWrapper } = require('./wrapper/PiezoSpeakerWrapper.js');
var { RGBLEDButtonWrapper } = require('./wrapper/RGBLEDButtonWrapper.js');
var { RGBLEDWrapper } = require('./wrapper/RGBLEDWrapper.js');
var { SoundIntensityWrapper } = require('./wrapper/SoundIntensityWrapper.js');
var { SoundPressureWrapper } = require('./wrapper/SoundPressureWrapper.js');
var { ThermalImagingWrapper } = require('./wrapper/ThermalImagingWrapper.js');
var { UVLightWrapper } = require('./wrapper/UVLightWrapper.js');
var { UVLightV2Wrapper } = require('./wrapper/UVLightV2Wrapper.js');

var _ipcon;
var _devices = new Map();

exports.setIPConnection = function (ipcon) {
    _ipcon = ipcon;
}

exports.add = function (uid, deviceIdentifier) {
    var device = _wrapDevice(uid, deviceIdentifier);
    if (typeof device !== "undefined") {
        console.log(chalk.green("Found device >" + device.getName() + "< (UID: " + device.getUID() + "/ DID: " + device.getDeviceIdentifier() + ")"));
        _devices.set(uid, device);
    }
    return device;
}

exports.addAgain = function (uid, deviceIdentifier) {
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


/* This function returns all devices if */
/* no new devices were registered after maxTimeout ms */
exports.getAllDevices = function (maxTimeout = 500) {

    var devices = [];
    var numDevices = _devices.length;
    var timePassed = 0;

    return new Promise((resolve, reject) => {

        var interval = setInterval(() => {

            timePassed += 50;
            var newDevices = checkIfNew();

            if (newDevices == false) {

                if (timePassed >= maxTimeout) {
                    clearInterval(interval);

                    var _devicesAsArr = [];
                    _devices.forEach((d) => { _devicesAsArr.push(d) });
                    resolve(_devicesAsArr);
                }
            }
            // If there was a new device
            else {
                timePassed = 0;
            }
        }, 50);
    });

    function checkIfNew() {
        if (_devices.length > numDevices) {
            return true
        }
        else return false;
    }


}

function _wrapDevice(uid, deviceIdentifier) {

    var deviceWrapper;

    switch (deviceIdentifier) {
        // Master Brick
        case 13:
            deviceName = "Master Brick";
            device = new tinkerforge.BrickMaster(uid, _ipcon);
            // TODO: Implement and replace with specific wrapper for Master Brick
            deviceWrapper = new Wrapper(device, uid, deviceIdentifier, deviceName);
            break;

        case 25:
            deviceName = "Distance IR Bricklet";
            device = new tinkerforge.BrickletDistanceIR(uid, _ipcon);
            deviceWrapper = new DistanceIRWrapper(device, uid, deviceIdentifier, deviceName);
            break;

        case 221:
            deviceName = "Barometer Bricklet";
            device = new tinkerforge.BrickletBarometer(uid, _ipcon);
            deviceWrapper = new BarometerWrapper(device, uid, deviceIdentifier, deviceName);
            break;

        case 229:
            deviceName = "Distance US  Bricklet";
            device = new tinkerforge.BrickletDistanceUS(uid, _ipcon);
            deviceWrapper = new DistanceUSWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 238:
            deviceName = "Sound Intensity Bricklet";
            device = new tinkerforge.BrickletSoundIntensity(uid, _ipcon);
            deviceWrapper = new SoundIntensityWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 242:
            deviceName = "Piezo Speaker Bricklet";
            device = new tinkerforge.BrickletPiezoSpeaker(uid, _ipcon);
            deviceWrapper = new PiezoSpeakerWrapper(device, uid, deviceIdentifier, deviceName);
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
        case 260:
            deviceName = tinkerforge.BrickletDustDetector.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletDustDetector(uid, _ipcon);
            deviceWrapper = new DustDetectorWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 262:
            deviceName = "CO2 Bricklet";
            device = new tinkerforge.BrickletCO2(uid, _ipcon);
            deviceWrapper = new CO2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 263:
            deviceName = "OLED 128x64 Display Bricklet";
            device = new tinkerforge.BrickletOLED128x64(uid, _ipcon);
            deviceWrapper = new OLEDDisplayWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 265:
            deviceName = "UV Light Bricklet";
            device = new tinkerforge.BrickletUVLight(uid, _ipcon);
            deviceWrapper = new UVLightWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 271:
            deviceName = "RGB LED Bricklet";
            device = new tinkerforge.BrickletRGBLED(uid, _ipcon);
            deviceWrapper = new RGBLEDWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 276:
            deviceName = "GPS Bricklet";
            device = new tinkerforge.BrickletGPSV2(uid, _ipcon);
            deviceWrapper = new GPSV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 278:
            deviceName = tinkerforge.BrickletThermalImaging.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletThermalImaging(uid, _ipcon);
            deviceWrapper = new ThermalImagingWrapper(device, uid, deviceIdentifier, deviceName);
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
        case 290:
            deviceName = tinkerforge.BrickletSoundPressureLevel.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletSoundPressureLevel(uid, _ipcon);
            deviceWrapper = new SoundPressureWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 292:
            deviceName = tinkerforge.BrickletMotionDetectorV2.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletMotionDetectorV2(uid, _ipcon);
            deviceWrapper = new MotionDetectorV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 297:
            deviceName = tinkerforge.BrickletAirQuality.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletAirQuality(uid, _ipcon);
            deviceWrapper = new AirQualityWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 298:
            deviceName = tinkerforge.BrickletLCD128x64.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletLCD128x64(uid, _ipcon);
            deviceWrapper = new LCD128x64DisplayWrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 2117:
            deviceName = tinkerforge.BrickletBarometerV2.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletBarometerV2(uid, _ipcon);
            deviceWrapper = new BarometerV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        case 2118:
            deviceName = tinkerforge.BrickletUVLightV2.DEVICE_DISPLAY_NAME;
            device = new tinkerforge.BrickletUVLightV2(uid, _ipcon);
            deviceWrapper = new UVLightV2Wrapper(device, uid, deviceIdentifier, deviceName);
            break;
        default:
            deviceWrapper = new Wrapper(null, uid, deviceIdentifier, "Unknown");
            console.log(chalk.yellow("Device with device ID >" + deviceIdentifier + "< is not supported yet."));
            break;
    }

    return deviceWrapper;
}