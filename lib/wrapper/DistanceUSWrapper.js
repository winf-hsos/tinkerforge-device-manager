var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class DistanceUSWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletDistanceUS.CALLBACK_DISTANCE, this.valueChanged.bind(this));
        this.setCallbackInterval(200);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDistanceCallbackPeriod(intervalInMs);
    }

}

exports.DistanceUSWrapper = DistanceUSWrapper;