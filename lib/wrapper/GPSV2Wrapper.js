var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class GPSV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletGPSV2.CALLBACK_COORDINATES, this.coordinatesChanged.bind(this));
        this.setCallbackInterval(1000);
    }

    setCallbackInterval(intervalInMs) {
        this.device.setCoordinatesCallbackPeriod(intervalInMs);
    }

    coordinatesChanged(latitude, ns, longitude, ew) {
        return super.valueChanged({ latitude: latitude / 1000000.0, longitude: longitude / 1000000.0, ns: ns, ew: ew });
    }

}

exports.GPSV2Wrapper = GPSV2Wrapper;