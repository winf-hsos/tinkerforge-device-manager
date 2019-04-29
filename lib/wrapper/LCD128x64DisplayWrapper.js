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
        super.valueChanged({ type: "touch position", pressure: pressure, x: x, y: y, age: age });
    }

    touchGesture(gesture, duration, pressureMax, xStart, xEnd, yStart, yEnd, age) {

        var valObj = {};
        valObj.type = "touch gesture";

        if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_LEFT_TO_RIGHT) {
            valObj.gesture = 'left to right';
        }
        else if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_RIGHT_TO_LEFT) {
            valObj.gesture = 'right to left';
        }
        else if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_TOP_TO_BOTTOM) {
            valObj.gesture = 'top to bottom';
        }
        else if (gesture === tinkerforge.BrickletLCD128x64.GESTURE_BOTTOM_TO_TOP) {
            valObj.gesture = 'bottom to top';
        }

        valObj.duration = duration;
        valObj.pressureMax = pressureMax;
        valObj.xStart = xStart;
        valObj.xEnd = xEnd;
        valObj.yStart = yStart;
        valObj.yEnd = yEnd;
        valObj.age = age;

        super.valueChanged(valObj);

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