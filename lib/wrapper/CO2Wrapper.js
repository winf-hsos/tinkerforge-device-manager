var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class CO2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
        
        this.device.on(tinkerforge.BrickletCO2.CALLBACK_CO2_CONCENTRATION, this.valueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setCO2ConcentrationCallbackPeriod(intervalInMs);
    }

}

exports.CO2Wrapper = CO2Wrapper;