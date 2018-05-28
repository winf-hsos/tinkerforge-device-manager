# Tinkerforge Device Manager
A node library to make connecting to and accessing Tinkerforge devices easier. Created at the University of Applied Sciences in Osnabrueck.

# Supported Devices
Currently supported Tinkerforge devices:

- Accelerometer Bricklet
- Ambient Light 2.0 Bricklet
- Humidity V2 Bricklet
- NFC Bricklet
- OLED 128x64 Display Bricklet
- RGB LED Bricklet
- RGB Button Bricklet

# Example
Consider you have a Humidity V2 Bricklet connected to a Master Brick. You can then use the device manager to get the Humidity V2 Bricklet via its UID. Note that the function returns a promise that will resolve as soon the device successfully connected:

```
var dm = require('./index.js');

// You can pass host and port, default is 'localhost' and 4223
dm.initialize();

// This returns a promise
dm.getDeviceByUid('Dik').then(start);

// Another way to get a device, in this case an accelerometer bricklet
dm.getDeviceByIdentifier(250).then(start);

function start(humidity) {
    console.log(humidity.getName());

    // Humidity V2 Bricklet
    if (device.getDeviceIdentifier() == 283) {
        device.registerListener(humidityChanged)
    }

    // Accelerometer Bricklet
    if (device.getDeviceIdentifier() == 250) {
        device.registerListener(accelerationChanged)
    }
}

function humidityChanged(valObject) {
    console.log(valObject);
}

function accelerationChanged(valObject) {
    console.log(valObject);
}
```