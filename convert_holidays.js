var ICAL = require("ical.js");
var execfile = require("./execfile.js");
var request = require("request")
var fs = require('fs');

var isDebugMode = true;

console.debug = function(args)
{
  if (isDebugMode){
    console.log(args);
  }
}

execfile("./ical_events.js", global);
execfile("./ical_fullcalendar.js", global);

//var parsed;

var ics_sources = [
    {
        url:'http://www.opm.gov/about-us/open-government/Data/Apps/Holidays/holidays.ical',
        target_file: 'js/holidays.js',
        name: 'holidays',
        event_properties:{
            color:'blue',
            className: ['holidays']
        }
    }
]

function data_req (url, callback) {
    req = new XMLHttpRequest()
    req.addEventListener('load', callback)
    req.open('GET', url)
    req.send()
}

function load_ics(ics){
    request({url: ics.url}, function(error, response, body) {
        //parsed = fixUpJcal(ICAL.parse(body));
        fs.writeFileSync(ics.target_file, 'var ' + ics.name + '=' + JSON.stringify(fc_events(body, ics.event_properties)));
        console.log('done writing: ' + ics.target_file);
    })
}

ics_sources.forEach(function(ics) { load_ics(ics) });
