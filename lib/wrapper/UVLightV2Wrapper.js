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
        var values = [];
        var sensorId = this.uid + "_uv_light";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'uvi',
            value: value
        })

        return super.valueChanged(values, err);
    }

    uvaChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_uv_light";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'uva',
            value: value
        })

        return super.valueChanged(values, err);
    }

    uvbChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_uv_light";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'uvb',
            value: value
        })

        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setUVICallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setUVACallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setUVBCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }
}

exports.UVLightV2Wrapper = UVLightV2Wrapper;