var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class ThermalImagingWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletThermalImaging.CALLBACK_HIGH_CONTRAST_IMAGE, this.highContrastImageValueChanged.bind(this));

        // This wrapper uses the high contrast as default
        // TODO: Make configurable in the future
        this.device.setImageTransferConfig(tinkerforge.BrickletThermalImaging.IMAGE_TRANSFER_CALLBACK_HIGH_CONTRAST_IMAGE);

        //this.setCallbackInterval(500);
    }

    highContrastImageValueChanged(value, err) {

        var values = [];
        var sensorId = this.uid + "_thermal_imaging";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'thermal_image',
            value: value
        })

        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setAirPressureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setAltitudeCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setTemperatureCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
    }
}

exports.ThermalImagingWrapper = ThermalImagingWrapper;