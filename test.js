var dm = require('./index.js');
dm.initialize();
dm.setConnectCallback(start);

function start(device) {
    console.log(device.getName());

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
        //device.registerListener(humidityChanged)
    }

    // Accelerometer Bricklet
    if (device.getDeviceIdentifier() == 250) {
        //device.registerListener(accelerationChanged)
    }

    // Outdoor Weather Bricklet
    if(device.getDeviceIdentifier() === 288) {
        device.registerListener(weatherDataChanged)
    }
}

function weatherDataChanged(valueObj) {
    console.dir(valueObj);
}

function humidityChanged(valObject) {
    console.log(valObject);
}

function accelerationChanged(valObject) {
    console.log(valObject);
}