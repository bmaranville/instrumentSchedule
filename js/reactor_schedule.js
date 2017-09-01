var reactor_schedule;

(function() {
  var schedules = [
    {
      year: "2017",
      operating: [
        "JANUARY 4 - JANUARY 29",
        "FEBRUARY 15 - MARCH 26",
        "APRIL 12 - APRIL 28",
        "MAY 2 - MAY 24",
        "JUNE 8 - JULY 16",
        "AUGUST 3 - SEPTEMBER 10"
      ]
    }
  ];
            
  var events = [];
  schedules.forEach(function(s) {
    s.operating.forEach(function(r) {
      var start_stop = r.split(' - ');
      var start = moment(start_stop[0] + "," + s.year, "MMMM D, YYYY");
      var stop = moment(start_stop[1] + "," + s.year, "MMMM D, YYYY");
      events.push({title: 'STARTUP', start: start});
      events.push({title: 'SHUTDOWN', start: stop});
    });
  });
  
  reactor_schedule = {
    events: events,
    color: 'red',
    textColor: 'white'
  }
})();