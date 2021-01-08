/* global dayjs */

var _google_calendar_20161211 = function () {
  var _panel = $("#google_calendar_20161211");

  var _title = _panel.find('[name="title"]').val().trim();
  var _start_date_val = _panel.find('[name="date_start"]').val();
  var _end_date_val = _panel.find('[name="date_end"]').val();
  
  // 這邊需要加入時差的調整
  //window.d = dayjs(_start_date)
  //console.log(dayjs(_start_date + '.0000').toISOString())
  //_end_date = (new Date(_end_date)).toISOString()
  let _start_date
  if (_start_date_val !== '') {
    _start_date = (new Date(_start_date_val + '.0000')).toISOString()
  }
  
  
  let _end_date
  if (_end_date_val !== '') {
    _end_date = (new Date(_end_date_val + '.0000')).toISOString()
  }
  else {
    _end_date = dayjs(_start_date_val + '.0000').add(1, 'hour').toISOString()
  }
  
  var _location = _panel.find('[name="location"]').val().trim();

// https://www.google.com/calendar/render?action=TEMPLATE&text=Your+Event+Name&dates=20140127T224000Z/20140320T221500Z&details=For+details,+link+here:+http://www.example.com&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml

// "2014-01-27T224000Z/20140320T221500Z".replace(/\-/g, "")

  var _details = _panel.find('[name="details"]').val().trim();
  var _add = _panel.find('[name="add"]').val().trim();

  var _url = "https://calendar.google.com/calendar/event?action=TEMPLATE";

  if (_title !== '') {
    _url = _url + "&text=" + _title;
  }

  if (_start_date !== '') {
    var _dates = _start_date + "Z";
    if (_end_date !== '') {
      _dates = _dates + "/" + _end_date + "Z";
    }

    _dates = _dates.replace(/\-/g, "");
    _dates = _dates.replace(/\:/g, "");

    _url = _url + "&dates=" + _dates;
  }

  if (_location !== '') {
    _url = _url + "&location=" + _location;
  }

  if (_details !== '') {
    _details = _details.replace(/\n/g, "+");
    _details = _details.replace(/ /g, "+");
    _url = _url + "&details=" + _details;
  }
  if (_add !== '') {
    _add = _add.replace(/\n/g, "+");
    _add = _add.replace(/ /g, "+");
    _url = _url + "&add=" + _add;
  }

  _url = encodeURI(_url);

  // --------------------

  var _result = _panel.find(".result");
  _result.empty();
  _result.append('<a target="_blank" href="' + _url + '">' + _url + '</a>');
  _result.append('<button tyle="button" class="btn" data-clipboard-text="' + _url + '">Copy to clipboard</button>');
  new Clipboard('.btn');
  _result.find("button").click(function () {
    $(this).notify("Copied!", {position: "right", className: "success"});
  });
};

var _set_current = function () {
  var d = new Date();
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000);

  var local = new Date(utc);
  //local.setMinutes(local.getMinutes() - local.getTimezoneOffset());
  _d = local.toJSON().slice(0, 19);
  //console.log(_d);
  $(this).prev().val(_d);
  //console.log($(_btn).prev().length);
};

$(function () {
  $("#google_calendar_20161211 label").click(_google_calendar_20161211).keyup(_google_calendar_20161211);
  

  $("#google_calendar_20161211 .set-current").click(_set_current);
  
  // 2021-01-09T15:47:44.946Z
  let current = dayjs().add(1, 'day').add(1, 'hour').set('minute', 0).set('second', 0).format('YYYY-MM-DDTHH:mm:ss')
  $("#google_calendar_20161211 [name='date_start']").val(current)
  
  let currentEnd = dayjs().add(1, 'day').add(2, 'hour').set('minute', 0).set('second', 0).format('YYYY-MM-DDTHH:mm:ss')
  $("#google_calendar_20161211 [name='date_end']").val(currentEnd)
  
  _google_calendar_20161211();
});