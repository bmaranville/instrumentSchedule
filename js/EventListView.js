/*
Responsible for the scroller, and forwarding event-related actions into the "grid"
*/

(function(FC) {
  var View = FC.View;
  var Grid = FC.Grid;
  var Scroller = FC.Scroller;

  FC.views.newlist = FC.View.extend({
    renderEvents: function(events) {
      this.el.addClass("fc-listYear-view"); 
      var target = $("<table />" , {class: "fc-list-table"}).append($("<tbody />"));
      this.scroller.el.empty();
      this.scroller.el.append(target);
      events.forEach(function(ev) {
        if (ev.data) {
          var header_row = $("<tr />", {class: "fc-list-heading"});
          var header = $("<td />", {class: "fc-widget-header", colspan: "3"});
          header_row.append(header);
          var date_text =  ev.start.toJSON() + " (" + ev.data["# of Days"] + " days) " + ev.data.instrument_name; 
          header.append($("<a />", {class: "fc-list-heading-main", text: date_text}));
          header.append($("<a />", {class: "fc-list-heading-alt", text: ev.data.primaryInvestigator })); //ev.data.Contact}));
          target.append(header_row);
          var data_row = $("<tr />", {class: "fc-list-item", style: "cursor:pointer;"});
          data_row.append($("<td />", {class: "fc-list-item-time fc-widget-content",
            text: ev.data.ID}));
          data_row.append($("<td />", {class: "fc-list-item-dot fc-widget-content"}).append($("<span />", {class: "fc-event-dot", style: "background-color:" + ev.source.color + ";"})));
          data_row.append($("<td />", {class: "fc-list-item-title fc-widget-content"}).append($("<a />", {text: ev.data.Title})));
          target.append(data_row);
          data_row.on("click", function() { show_summary(ev.data) });
        }
      });
    }

  });
  
  FC.views.shortlist = FC.View.extend({
    constructor: function() {
      View.apply(this, arguments);

      this.scroller = new Scroller({
        overflowX: 'auto',
        overflowY: 'auto'
      });
    },


    renderSkeleton: function() {
      this.el.addClass(
        'fc-list-view ' +
        this.calendar.theme.getClass('listView')
      );

      this.scroller.render();
      this.scroller.el.appendTo(this.el);

      this.contentEl = this.scroller.scrollEl; // shortcut
    },
    
    unrenderSkeleton: function() {
      this.scroller.destroy(); // will remove the Grid too
    },

    updateSize: function(totalHeight, isAuto, isResize) {
      this.scroller.setHeight(this.computeScrollerHeight(totalHeight));
    },

    computeScrollerHeight: function(totalHeight) {
      return totalHeight -
        subtractInnerElHeight(this.el, this.scroller.el); // everything that's NOT the scroller
    },
    
    renderEvents: function(events) {
      this.el.addClass("fc-listYear-view"); 
      var target = $("<table />" , {class: "fc-list-table"}).append($("<tbody />"));
      this.scroller.el.empty();
      this.scroller.el.append(target);
      var instrument = null;
      events.forEach(function(ev) {
        //console.log(ev.data.instrument_name, instrument);
        if (ev.data) {
          if (ev.data.instrument_name != instrument) {
            instrument = ev.data.instrument_name;
            target.append($("<tr />").append($("<td />", {html: "<b>Instrument: " + instrument + "</b>", colspan: 4, style: "text-align: center;background-color:LightGrey;"})));
          } 
          var data_row = $("<tr />", {class: "fc-list-item", style: "cursor:pointer;"});
          data_row.append($("<td />", {class: "fc-list-item-time fc-widget-content",  html: ev.start.toJSON() + " (" + ev.data["# of Days"] + "d)"}));
          data_row.append($("<td />", {class: "fc-list-item-time fc-widget-content",
            html: "<b>" + ev.data.ID + "</b>"})); // <em>(" + ev.data._parsed_participants.names[0] + ")</em> "}));
          data_row.append($("<td />", {class: "fc-list-item-time fc-widget-content",  html: "<em>" + ev.data.primaryInvestigator + "</em> "}));
          data_row.append($("<td />", {class: "fc-list-item-title fc-widget-content"}).append($("<a />", {text: ev.data.Title})));
          target.append(data_row);
          data_row.on("click", function() { show_summary(ev.data) });
        }
      });
    }

  });
  
  FC.views.fulltable = FC.views.list.class.extend({
    renderEvents: function(events) {
      var headers = ["Start Date", "# of Days", "ID", "Title", "Participants", "Institution Name", "Equipment", "Contact"]
      var renderers = {
        "Start Date": function(data) {
          var start = new Date(data["Start Date"]);
          var hours = start.getHours().toFixed();
          var minutes = ("0" + start.getMinutes().toFixed()).slice(-2);
          var datestring = (start.getMonth()+1).toFixed() + "/" + start.getDate().toFixed() + "/" + start.getFullYear().toFixed();
          return datestring + " " + hours + ":" + minutes;
        }, 
        "Participants": function(data) {
          var output = "<ul>"
          //var output = "<div>"
          data.Participants.forEach(function(p) {
            var li_html = p.name + '<sup>' + p.affiliation_index + ((p.principalInvestigator) ? ",PI" : "") + '</sup>';
            output += "<li>" + li_html + "</li>";
            //output += li_html;
          });
          output += "</ul>";
          return output
        }, 
        "Institution Name": function(data) {
          return "<ol>" + data.affiliations.map(function(af) { return "<li>"+af+"</li>" }).join("") + "</ol>";
        }
      }
        
      this.el.addClass("fc-listYear-view"); 
      var target = $("<table />" , {class: "schedule-table fc-list-table"})
      var thead; target.append(thead = $("<thead />"));
      var theadrow; thead.append(theadrow = $("<tr />"));
      var tbody = target.append($("<tbody />"));
      headers.forEach(function(h) { theadrow.append($("<th />", {text: h})) });
      if (events.length == 0) {
        target.append($("<h3 />", {text: "No events for this instrument"}));
      }
      else {
        events.forEach(function(ev) {
          var data = ev.data;
          if (data) {
            var row = $("<tr />");
            headers.forEach(function(h) {
              var html = (renderers[h]) ? renderers[h](data) : data[h];
              row.append($("<td />", {html: html}));
            });
            tbody.append(row);
          }
        });
      }
      
      this.scroller.el.empty();
      this.scroller.el.append(target);
      //target.append($("<pre />", {text: JSON.stringify(events, null, 2) }));
    }
  });
  
  function subtractInnerElHeight(outerEl, innerEl) {
    var both = outerEl.add(innerEl);
    var diff;

    // effin' IE8/9/10/11 sometimes returns 0 for dimensions. this weird hack was the only thing that worked
    both.css({
      position: 'relative', // cause a reflow, which will force fresh dimension recalculation
      left: -1 // ensure reflow in case the el was already relative. negative is less likely to cause new scroll
    });
    diff = outerEl.outerHeight() - innerEl.outerHeight(); // grab the dimensions
    both.css({ position: '', left: '' }); // undo hack

    return diff;
  }

  
})($.fullCalendar);
