var dm = require('./index.js');
dm.initialize();
dm.setConnectCallback(start);

function start(device) {
    if (typeof device == "undefined") {
        console.log("Device is undefined");
        return;
    }

    console.log(device.getName());

    var deviceName = device.getName();

    if (deviceName == "Outdoor Weather Bricklet") {
        device.registerListener(weatherDataChanged);
    }

    // Motion Detector 2.0
    if (device.getDeviceIdentifier() == 292) {
        device.registerListener(motionDetected);
    }


    // RGB Button Bricklet
    if (device.getDeviceIdentifier() == 282) {
        device.blink(255, 0, 0, 500);

        setTimeout(() => {
            device.stopBlink();
        }, 7000)
    }

    // RGB LED Bricklet
    if (device.getDeviceIdentifier() == 271) {
        device.blink(0, 255, 0, 100);

        setTimeout(() => {
            device.stopBlink();
        }, 5000)
    }

    // Humidity V2 Bricklet
    if (device.getDeviceIdentifier() == 283) {
        //device.registerListener(humidityChanged);
    }

    // Ambient Light Bricklet
    if (device.getDeviceIdentifier() == 259) {
        //device.registerListener(ambientLightChanged);
    }

    // UV Light Bricklet
    if (device.getDeviceIdentifier() == 265) {
        //device.registerListener(uvLightChanged);
    }

    // CO2 Bricklet
    if (device.getDeviceIdentifier() == 262) {
        device.registerListener(co2Changed);
    }

    // Barometer Bricklet
    if (device.getDeviceIdentifier() == 221) {
        //device.registerListener(airPressureChanged);
    }

    // Sound Intensity Bricklet
    if (device.getDeviceIdentifier() == 238) {
        device.registerListener(soundIntensityChanged);
    }

    // Accelerometer Bricklet
    if (device.getDeviceIdentifier() == 250) {
        //device.registerListener(accelerationChanged)
    }

    // Outdoor Weather Bricklet
    if (device.getDeviceIdentifier() === 288) {
        //device.registerListener(weatherDataChanged)
    }

    // Sound Pressure Level Bricklet
    if (device.getDeviceIdentifier() === 290) {
        //device.registerListener(soundPressureChanged)
    }

    // Barometer V2 Bricklet
    if (device.getDeviceIdentifier() === 2117) {
        //device.registerListener(barometerChanged)
    }

    // Air Quality Bricklet
    if (device.getDeviceIdentifier() === 297) {
        device.setCallbackInterval(5000);
        device.registerListener(airQualityChanged)
    }

    // UV Light V2
    if (device.getDeviceIdentifier() === 2118) {
        //device.setCallbackInterval(2000);
        //device.registerListener(uvLightV2Changed)
    }

    // Dust Detector
    if (device.getDeviceIdentifier() === 260) {
        device.setCallbackInterval(2000);
        device.registerListener(dustChanged)
    }

    // Thermal Imaging
    if (device.getDeviceIdentifier() === 278) {
        //device.setCallbackInterval(2000);
        device.registerListener(thermalImageChanged)
    }
}

function motionDetected(valObj) {
    console.log(valObj);
}

function thermalImageChanged(valObj) {
    //console.dir(valObj);
}

function dustChanged(valObj) {
    console.dir(valObj);
}

function uvLightV2Changed(valObj) {
    console.dir(valObj);
}

function airQualityChanged(valObj) {
    console.dir(valObj);
}

function barometerChanged(valObj) {
    console.dir(valObj);
}

function soundPressureChanged(valObj) {
    if (valObj.value.type == "decibel")
        console.dir(valObj);
}

function weatherDataChanged(valObj) {
    console.dir(valObj);
}

function soundIntensityChanged(valObject) {
    console.dir(valObject);
}

function humidityChanged(valObject) {
    if (valObject.value.type == "temperature") {
        console.log(valObject.value.value);
    }
}

function co2Changed(valObject) {
    console.log(valObject);
}

function airPressureChanged(valObject) {
    console.log(valObject);
}

function ambientLightChanged(valObject) {
    console.log(valObject);
}

function uvLightChanged(valObject) {
    console.log(valObject);
}

function accelerationChanged(valObject) {
    console.log(valObject);
}