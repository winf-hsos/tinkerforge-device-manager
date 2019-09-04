var dm = require('./index.js');
dm.initialize();


async function run() {

    var devs = await dm.getAllDevices();
    console.log(devs.length);

    for (var i = 0; i < devs.length; i++) {
        console.dir(devs[i].deviceName);
        if (devs[i].deviceIdentifer !== 13)
            devs[i].registerListener((valueObj) => {
                console.dir(valueObj);
            })
    }

    /*
    var humidity = await dm.getDeviceByIdentifier(283);
    console.dir(humidity.deviceName);

    var unknown = await dm.getDeviceByIdentifier(2147);
    console.dir(unknown.uid);
    */
}


run();
