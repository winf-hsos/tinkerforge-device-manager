# Tinkerforge Device Manager
A node library to make connecting to and accessing Tinkerforge devices easier. Created at the University of Applied Sciences in Osnabrueck.

# Supported Devices
Currently supported Tinkerforge devices:

- Humidity V2 Bricklet

# Example
Consider you have a Humidity V2 Bricklet connected to a Master Brick. You can then use the device manager to get the Humidity V2 Bricklet via its UID. Note that the function returns a promise that will resolve as soon the device successfully connected:

```
var dm = require('./index.js');

// You can pass host and port, default is 'localhost' and 4223
dm.initialize();

// This returns a promise
dm.getDeviceByUid('Dik').then(start);

function start(humidity) {
    console.log(humidity.getName());
    humidity.registerListener(humidityChanged)
}

function humidityChanged(valObject) {
    console.log(valObject);
}
```