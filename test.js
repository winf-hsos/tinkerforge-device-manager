var dm = require('./index.js');
dm.initialize();
dm.getDeviceByUid('Dik').then(start);

function start(humidity) {

    console.log(humidity.getName());

    humidity.registerListener(humidityChanged)
}

function humidityChanged(valObject) {
    console.log(valObject);
}