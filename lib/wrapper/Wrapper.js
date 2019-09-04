var moment = require('moment');

class Wrapper {
    constructor(device, uid, deviceIdentifier, deviceName) {
        //console.log(uid + "/" + deviceIdentifier);

        this.device = device;
        this.uid = uid;
        this.deviceIdentifier = deviceIdentifier;
        this.deviceName = deviceName;

        this.listener = [];
        this.logger = [];
    }

    getUID() {
        return this.uid;
    }

    getDeviceIdentifier() {
        return this.deviceIdentifier;
    }

    getName() {
        return this.deviceName;
    }

    registerLogger(logger) {
        this.logger.push(logger);
    }

    registerListener(callback) {
        this.listener.push(callback);
    }

    removeListener(callback) {
        var deleteIndex = -1;
        this.listener.forEach((listener, index) => {
            if (listener === callback)
                deleteIndex = index;
        });

        this.listener.splice(deleteIndex, 1);
    }

    valueChanged(values, err) {
        if (err)
            console.log(err)
        else {
            var now = Date.now();
            var valueObj = {
                uid: this.uid,
                deviceIdentifier: this.deviceIdentifier,
                time_formatted: moment(now).format('YYYY-MM-DD HH:mm:ss:SSS'),
                timestamp: now,
                values: values
            };

            this.listener.forEach((listener) => {
                listener(valueObj);
            });

            this.logger.forEach((logger) => {
                logger.info(this._formatValue(valueObj));
            });
        }
    }

    _formatValue(valueObj) {
        var time = moment(new Date().getTime());
        var logEntry = valueObj.time + ";" + valueObj.uid + ";" + valueObj.deviceIdentifier + ";" + valueObj.value;
        return logEntry;
    }

}

exports.Wrapper = Wrapper;