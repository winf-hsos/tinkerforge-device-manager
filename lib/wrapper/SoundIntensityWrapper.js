var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class SoundIntensityWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletSoundIntensity.CALLBACK_INTENSITY, this.valueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setIntensityCallbackPeriod(intervalInMs);
    }

}

exports.SoundIntensityWrapper = SoundIntensityWrapper;