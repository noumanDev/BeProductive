
const axios = require('axios');
const moment = require('moment');

var getSalahTimes = async function getSalahTimes() {
    var data = await axios.get(
        'http://api.aladhan.com/timingsByCity?city=rwp&country=pk&method=1&school='
    ).then((response) => {
        console.log('loaded successfully');
        return response.data.data;
    }).catch((e) => {
        console.log(e);
    });

    var namazNames = Object.keys(data.timings);
    //console.log(data);
    var namazFormattedTimings = [];
    var date =new Date(data.date.readable);
    //console.log(date);

    for (let i in namazNames) {
        
        console.log(namazNames[i],moment().hour(data.timings[namazNames[i]].split(':')[0]).minute(data.timings[namazNames[i]].split(':')[1]).format());
        
        namazFormattedTimings.push({
            name: namazNames[i],
            timing: moment().hour(data.timings[namazNames[i]].split(':')[0]).minute(data.timings[namazNames[i]].split(':')[1]).format(),
        });

        if (namazNames[i] == 'Sunrise') {
            namazFormattedTimings.push({
                name: 'Ishraq',
                timing: moment().hour(data.timings[namazNames[i]].split(':')[0]).minute(data.timings[namazNames[i]].split(':')[1]).add(15,'minute').format()
            });
        }

        //console.log(namazNames[i], data.timings[namazNames[i]]);
    }
    return namazFormattedTimings;
}

module.exports.getSalahTimes = getSalahTimes;