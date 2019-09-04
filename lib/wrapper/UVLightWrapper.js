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

    uvLightValueChanged(uvLight, err) {
        var values = [];
        var sensorId = this.uid + "_uv_light";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'uv_light',
            value: value
        })

        return super.valueChanged(values, err);
    }

}

exports.UVLightWrapper = UVLightWrapper;