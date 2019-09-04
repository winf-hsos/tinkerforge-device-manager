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

    dustValueChanged(dust, err) {
        var values = [];
        var sensorId = this.uid + "_dust_detector";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'dust',
            value: dust
        })
        return super.valueChanged(values, err);
    }

}

exports.DustDetectorWrapper = DustDetectorWrapper;