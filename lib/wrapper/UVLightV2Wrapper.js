var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class UVLightV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletUVLightV2.CALLBACK_UVI, this.uviChanged.bind(this));
        this.device.on(tinkerforge.BrickletUVLightV2.CALLBACK_UVA, this.uvaChanged.bind(this));
        this.device.on(tinkerforge.BrickletUVLightV2.CALLBACK_UVB, this.uvbChanged.bind(this));

        this.setCallbackInterval(500);
    }

    uviChanged(value, err) {
        return super.valueChanged({ type: "uvi", value: value }, err);
    }

    uvaChanged(value, err) {
        return super.valueChanged({ type: "uva", value: value }, err);
    }

    uvbChanged(value, err) {
        return super.valueChanged({ type: "uvb", value: value }, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setUVICallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setUVACallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setUVBCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }
}

exports.UVLightV2Wrapper = UVLightV2Wrapper;