var dm = require('./index.js');
dm.initialize();
dm.getDeviceByUid('Dik').then(start);
dm.getDeviceByIdentifier(282).then(start);
dm.getDeviceByIdentifier(271).then(start);
dm.getDeviceByIdentifier(250).then(start);

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


}

function humidityChanged(valObject) {
    console.log(valObject);
}

function accelerationChanged(valObject) {
    console.log(valObject);
}