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
    },
    {
      year: "2018",
      operating: [
        "JANUARY 8 - FEBRUARY 16",
        "MARCH 1 - APRIL 8",
        "APRIL 25 - JUNE 2",
        "JUNE 15 - JUNE 22",
        "JUNE 25 - JULY 25",
        "AUGUST 8 - AUGUST 25",
        "SEPTEMBER 5 - SEPTEMBER 28"
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
