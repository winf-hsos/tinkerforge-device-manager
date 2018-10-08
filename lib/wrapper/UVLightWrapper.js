var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class UVLightWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletUVLight.CALLBACK_UV_LIGHT, this.valueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setUVLightCallbackPeriod(intervalInMs);
    }

}

exports.UVLightWrapper = UVLightWrapper;