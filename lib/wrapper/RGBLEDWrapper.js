var { Wrapper } = require('./Wrapper.js');

class RGBLEDWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.blinkStatus = 0;
        this.isBlinking = false;
    }

    setColor(r, g, b) {
        this.stopBlink();
        return this.device.setRGBValue(r, g, b);
    }

    off() {
        this.stopBlink();
        return this.device.setRGBValue(0, 0, 0);
    }

    blink(r, g, b, speed = 500) {
        if (this.isBlinking == false) {
            this.isBlinking = true;

            this.blinkInterval = setInterval(() => {

                if (this.blinkStatus == 0) {
                    this.device.setRGBValue(0, 0, 0);
                    this.blinkStatus = 1;
                }
                else {
                    this.device.setRGBValue(r, g, b);
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
            return this.device.setRGBValue(0, 0, 0);
        }
    }

    white() {
        return this.setColor(255, 255, 255);
    }

}

exports.RGBLEDWrapper = RGBLEDWrapper;