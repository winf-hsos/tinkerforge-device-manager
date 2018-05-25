var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class RGBLEDButtonWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.blinkStatus = 0;
        this.isBlinking = false;

        this.device.on(tinkerforge.BrickletRGBLEDButton.CALLBACK_BUTTON_STATE_CHANGED, this.buttonStateChanged.bind(this));
    }

    setColor(r, g, b) {
        this.stopBlink();
        return this.device.setColor(r, g, b);
    }

    off() {
        this.stopBlink();
        return this.setColor(0, 0, 0);
    }

    white() {
        this.stopBlink();
        return this.setColor(255, 255, 255);
    }

    blink(r, g, b, speed = 500) {
        if (this.isBlinking == false) {
            this.isBlinking = true;
            this.blinkInterval = setInterval(() => {

                if (this.blinkStatus == 0) {
                    this.device.setColor(0, 0, 0);
                    this.blinkStatus = 1;
                }
                else {
                    this.device.setColor(r, g, b);
                    this.blinkStatus = 0;
                }
            }, speed);
        }
    }

    stopBlink() {
        if (this.blinkInterval) {
            this.isBlinking = false;
            this.blinkStatus = 0;
            clearInterval(this.blinkInterval);
            return this.device.setColor(0, 0, 0);
        }
    }

    buttonStateChanged(value, err) {
        return super.valueChanged(value == 0 ? "PRESSED" : "RELEASED", err);
    }
}

exports.RGBLEDButtonWrapper = RGBLEDButtonWrapper;