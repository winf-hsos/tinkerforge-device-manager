var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class PiezoSpeakerWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);
    }

    beep(ms, frequency) {
        this.device.beep(ms, frequency);
    }

    alarm(beepLength, pauseLength, frequency, stopIn = null) {
        this.alarmTimer = setInterval(() => {
            this.beep(beepLength, frequency);
        }, pauseLength + beepLength);

        if (stopIn !== null) {
            setTimeout(this.stopAlarm.bind(this), stopIn);
        }
    }

    stopAlarm() {
        if (this.alarmTimer) {
            clearInterval(this.alarmTimer);
        }
    }
}

exports.PiezoSpeakerWrapper = PiezoSpeakerWrapper;