var instrument_numbers = {
  "BT2": 20,
  "NG6": 22,
  "PBR": 112,
  "MAGIK": 113,
  "NG7R": 8,
  "NG7:HGR": 8,
  "BT1": 1,
  "BT8": 2,
  "NG7SANS": 3,
  "NGB30SANS": 4,
  "SANS:NGB30": 4,
  "BT4FANS": 12,
  "BT4": 23,
  "USANS": 5,
  "BT7": 9,
  "MACS": 72,
  "HFBS": 15,
  "DCS": 14,
  "SPINS": 11,
  "NSE": 16,
  "SPINECHO": 16,
  "NDP": 29,
  "PGAA": 17,
  "PHADES": 172,
  "BRUKER": 92,
  "NAA": 32,
  "NG6M": 53,
  "NG6U": 52,
  "VT5": 18,
  "NG7INT": 21
}

var calendar_url = "https://www-s.nist.gov/NCNR-IMS/instrumentSchedule.do?instrId=";
//var calendar_url = "https://www.ncnr.nist.gov/instruments/magik/php/instrument_schedule.php?id=";
//var calendar_url = "https://tstweb.nist.gov:7302/NCNR-IMS/instrumentSchedule.do?instrId=";

function get_events(instrument) {
    return {
        events: function(start, end, timezone, callback) {
            $.get(calendar_url + instrument_numbers[instrument].toFixed() + "&type=json").then(function(schedule) {
                callback(schedule.map(convert_to_fullcal, {instrument: instrument}));
            }).fail(function() { callback([]) });
        }
    }
}

function get_items(instrument) {
  return $.get(calendar_url + instrument_numbers[instrument].toFixed() + "&type=json")
    .fail(function() {
      alert('woops'); // or whatever
    });
}

function convert_to_fullcal(item) {
  var fullcal = {};
  var start = new Date(item["Start Date"]);
  start.setHours(0); // reset to midnight...
  var title = item["ID"] + " ";
  var participants = item.Participants;
  var primaryInvestigator = (participants.find(function(p) { return p.principalInvestigator == true }) || {}).name || "";
  title += primaryInvestigator;
  title += " " + item["Title"];
  fullcal.title = title;
  fullcal.start = start.toISOString();
  var end = addDays(start, parseInt(item["# of Days"]));
  fullcal.end = end.toISOString();
  fullcal.data = item;
  fullcal.data.instrument_name = this.instrument;
  fullcal.data.primaryInvestigator = primaryInvestigator
  groupInstitutions(item);
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
    
      
