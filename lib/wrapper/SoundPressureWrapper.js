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
        return super.valueChanged({ type: "decibel", value: value }, err);
    }

    spectrumValueChanged(spectrumLength, spectrumChunkOffset, spectrumChunkData, err) {

        var value = {
            spectrumLength: spectrumLength,
            spectrumChunkOffset: spectrumChunkOffset,
            spectrumChunkData: spectrumChunkData
        }

        return super.valueChanged({ type: "spectrum", value: value }, err);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setDecibelCallbackConfiguration(intervalInMs, false, 'x', 0, 0);
        this.device.setSpectrumCallbackConfiguration(intervalInMs);
    }

}

exports.SoundPressureWrapper = SoundPressureWrapper;