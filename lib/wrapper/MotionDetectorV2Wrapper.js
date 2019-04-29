var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class MotionDetectorV2Wrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletMotionDetectorV2.CALLBACK_MOTION_DETECTED, this.motionDetected.bind(this));
        this.device.on(tinkerforge.BrickletMotionDetectorV2.CALLBACK_DETECTION_CYCLE_ENDED, this.motionDetectedOff.bind(this));
    }

    motionDetected() {
        return super.valueChanged("motion detected");
    }

    motionDetectedOff() {
        return super.valueChanged("detection cycle ended");
    }
}

exports.MotionDetectorV2Wrapper = MotionDetectorV2Wrapper;