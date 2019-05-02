# Tinkerforge Device Manager
A node library to make connecting to and accessing Tinkerforge devices easier. Created at the University of Applied Sciences in Osnabrueck.

# Supported Devices
Currently supported Tinkerforge devices:

- [Accelerometer Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Accelerometer.html)
- [Air Quality Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Air_Quality.html)
- [Ambient Light 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Ambient_Light_V2.html)
- [Barometer 1.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Barometer.html#barometer-bricklet)
- [Barometer 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Barometer_V2.html)
- [C02 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/CO2.html)
- [Dust Detector Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Dust_Detector.html)
- [Distance IR Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Distance_IR.html)
- [Humidity 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Humidity_V2.html)
- [LCD 128x64 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/LCD_128x64.html)
- [Motion Detector 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Motion_Detector_V2.html)
- [NFC Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/NFC.html)
- [OLED 128x64 Display Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/OLED_128x64.html)
- [Outdoor Weather Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Outdoor_Weather.html)
- [RGB LED Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/RGB_LED.html)
- [RGB LED Button Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/RGB_LED_Button.html)
- [Sound Intensity Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Sound_Intensity.html)
- [Sound Pressure Level Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Sound_Pressure_Level.html)
- [Thermal Imaging Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/Thermal_Imaging.html)
- [UV Light 1.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/UV_Light.html)
- [UV Light 2.0 Bricklet](https://www.tinkerforge.com/de/doc/Hardware/Bricklets/UV_Light_V2.html)

# Example
Consider you have a Humidity V2 Bricklet connected to a Master Brick. You can then use the device manager to get the Humidity V2 Bricklet via its UID or its [device identifier](https://www.tinkerforge.com/de/doc/Software/Device_Identifier.html). The process is as follows:

1. Initialize the device manager (`dm.initialize()`)
2. Set a callback that is called for each connected device (e.g. `dm.setConnectCallback(start);`)
3. In `start(device)` you'll have the current device as a wrapper object. Now you can check the type and register listeners (or do anything else)

Here is a full example (see also `test.js`):

```js
var dm = require('./index.js');

// You can pass host and port, default is 'localhost' and 4223
dm.initialize();

// This will call start for each enumerated device
dm.setConnectCallback(start);

function start(device) {
    // Check the name of the current device
    console.log(device.getName());

    // Humidity V2 Bricklet
    if (device.getDeviceIdentifier() == 283) {
        device.registerListener(humidityChanged)
    }

    // Accelerometer Bricklet
    if (device.getDeviceIdentifier() == 250) {
        device.registerListener(accelerationChanged)
    }

    // And so on...
}

function humidityChanged(valObject) {
    console.log(valObject);
}

function accelerationChanged(valObject) {
    console.log(valObject);
}
```