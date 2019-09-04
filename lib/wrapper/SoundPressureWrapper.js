var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class SoundPressureWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletSoundPressureLevel.CALLBACK_DECIBEL, this.decibelValueChanged.bind(this));
        this.device.on(tinkerforge.BrickletSoundPressureLevel.CALLBACK_SPECTRUM_LOW_LEVEL, this.spectrumValueChanged.bind(this));
        this.setCallbackInterval(500);
    }

    decibelValueChanged(value, err) {
        var values = [];
        var sensorId = this.uid + "_sound_pressure";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'decibel_value',
            value: value
        })

        return super.valueChanged(values, err);
    }

    spectrumValueChanged(spectrumLength, spectrumChunkOffset, spectrumChunkData, err) {

        var values = [];
        var sensorId = this.uid + "_sound_pressure";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'spectrum_length',
            value: spectrumLength
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'spectrum_chunk_offset',
            value: spectrumChunkOffset
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'spectrum_chunk_data',
            value: spectrumChunkData
        })

        return super.valueChanged(values, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDecibelCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setSpectrumCallbackConfiguration(intervalInMs);
    }

}

exports.SoundPressureWrapper = SoundPressureWrapper;