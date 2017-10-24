var sans_instruments = {
  "NG7SANS": "ng7",
  "NG7": "ng7",
  "NG3SANS": "ng3",
  "NGB30SANS": "ng3",
  "NG3": "ng3"
}

var sans_calendar_url = "https://ncnr.nist.gov/instrumentSchedule/sansdata/";
//var calendar_url = "https://www.ncnr.nist.gov/instruments/magik/php/instrument_schedule.php?id=";
//var calendar_url = "https://tstweb.nist.gov:7302/NCNR-IMS/instrumentSchedule.do?instrId=";
var sans_events_cache = {};

function get_sans_events(instrument) {
    return {
        events: function(start, end, timezone, callback) {
          if (sans_events_cache[instrument] != null) {
            callback(sans_events_cache[instrument]);
          } else {
            $.get(sans_calendar_url + instrument + ".json").then(function(schedule) {
                sans_events_cache[instrument] = schedule.map(convert_sans_to_fullcal, {instrument: instrument});
                callback(sans_events_cache[instrument]);
            }).fail(function() { callback([]) });
          }
        }
    }
}

function get_items(instrument) {
  return $.get(calendar_url + instrument_numbers[instrument].toFixed() + "&type=json")
    .fail(function() {
      alert('woops'); // or whatever
    });
}

function convert_sans_to_fullcal(item) {
  var fullcal = {};
  var ims_item = {};
  ims_item.affiliations = [];
  var participants = (item.name || "").split(/[+,]/).map(function(n,i) {
    return {name: n, principalInvestigator: (i==0), affiliation_index: ""};
  });
  ims_item["Participants"] = participants;
  var start = new Date(item["month"] + ' ' + item["date"] + ", " + item["year"]);
  if (isNaN(start.getTime())) { start = new Date(0);  } // bad date.  resets to 1970.
  start.setHours(0); // reset to midnight...
  ims_item["Start Date"] = start.toDateString();
  
  var title = item.unique_id || "";
  var primaryInvestigator = participants[0].name;
  ims_item.primaryInvestigator = primaryInvestigator;
  ims_item["# of Days"] = item.days;
  ims_item["Equipment"] = [item.equip] || [];
  ims_item["Contact"] = item.localcontact || "";
  ims_item.ID = item.unique_id + " " + item.reqno || "";
  var title = ims_item.Title = item.unique_id + " " + item.title;
  
  fullcal.title = title;
  fullcal.start = start.toISOString();
  var end = addDays(start, parseInt(item.days || 0));
  fullcal.end = end.toISOString();
  fullcal.data = ims_item;
  fullcal.data.instrument_name = this.instrument;
  fullcal.data.primaryInvestigator = primaryInvestigator
  return fullcal;
}
  
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(date.getDate() + days);
  return result;
}

function groupInstitutions(item) {
  // gets a list of participants with name and institution;
  // adds institution id to participant and returns ordered list of institutions
  var participants = item.Participants;
  var institutions = [];
  participants.forEach(function(p) {
    var inum = institutions.indexOf(p.institution) + 1;
    if (inum < 0.5) { inum = institutions.push(p.institution) }
    p.affiliation_index = inum;
  })
  item.affiliations = institutions;
}
    
      
