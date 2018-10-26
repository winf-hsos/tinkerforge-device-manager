var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class DustDetectorWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletDustDetector.CALLBACK_DUST_DENSITY, this.valueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDustDensityCallbackPeriod(intervalInMs);
    }

}

exports.DustDetectorWrapper = DustDetectorWrapper;