var tinkerforge = require('tinkerforge');
var { Wrapper } = require('./Wrapper.js');

class LCD128x64DisplayWrapper extends Wrapper {

    constructor(device, uid, deviceIdentifier, deviceName) {
        super(device, uid, deviceIdentifier, deviceName);

        this.device.on(tinkerforge.BrickletLCD128x64.CALLBACK_TOUCH_POSITION, this.touchPosition.bind(this))
        this.device.on(tinkerforge.BrickletLCD128x64.CALLBACK_TOUCH_GESTURE, this.touchGesture.bind(this))

        this.device.setTouchPositionCallbackConfiguration(100, true);
        this.device.setTouchGestureCallbackConfiguration(100, true);
    }

    touchPosition(pressure, x, y, age) {

        var values = [];
        var sensorId = this.uid + "_lcd_128x64_touch_display";

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_position_pressure',
            value: pressure
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_position_x',
            value: x
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_position_y',
            value: y
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_position_age',
            value: age
        })

        return super.valueChanged(values);
    }

    touchGesture(gesture, duration, pressureMax, xStart, xEnd, yStart, yEnd, age) {

        var values = [];
        var sensorId = this.uid + "_lcd_128x64_touch_display";

        var gestureText = '';

        if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_LEFT_TO_RIGHT) {
            gestureText = 'left to right';
        }
        else if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_RIGHT_TO_LEFT) {
            gestureText = 'right to left';
        }
        else if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_TOP_TO_BOTTOM) {
            gestureText = 'top to bottom';
        }
        else if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_BOTTOM_TO_TOP) {
            gestureText = 'bottom to top';
        }

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_gesture',
            value: gestureText
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_duration',
            value: duration
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_pressure_max',
            value: pressureMax
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_x_start',
            value: xStart
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_x_end',
            value: xEnd
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_y_start',
            value: yStart
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_y_end',
            value: yEnd
        })

        values.push({
            sensor_id: sensorId,
            station_id: null,
            type: 'touch_gesture_age',
            value: age
        })

        return super.valueChanged(values);
    }

    write(x, y, text) {
        return this.device.writeLine(x, y, text);
    }

    clearLine(lineNumber) {
        var clearString = "";

        for (var i = 0; i <= 25; i++) {
            clearString += " ";
        }
        this.write(lineNumber, 0, clearString);
    }

    clearDisplay() {
        for (var i = 0; i <= 7; i++) {
            this.clearLine(i);
        }
    }
}

exports.LCD128x64DisplayWrapper = LCD128x64DisplayWrapper;