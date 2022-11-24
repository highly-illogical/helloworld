var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
var days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

function generateCalendar(date) {
  var month = date.getMonth();
  var start = date.getDay() - 1;
  var end = new Date();
  end.setMonth(date.getMonth() + 1, 0);
  var date_end = 0;
  if (date.getMonth() == 1) {
    if (date.getFullYear() % 4 == 0) {
      if (date.getFullYear() % 100 == 0) {
        if (date.getFullYear() % 400 == 0) {
          date_end = 29;
        } else {
          date_end = 28;
        }
      } else {
        date_end = 29;
      }
    } else {
      date_end = 28;
    }
  } else {
    date_end = end.getDate();
  }
  var table = document.getElementById('dates');
  table.innerHTML = '';

  document.getElementById('month').innerHTML =
    months[date.getMonth()] + ' ' + date.getFullYear();

  for (var i = 0; i < 7; i++) {
    var row = document.createElement('tr');
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement('td');
      if (i == 0) {
        cell.innerText = days[j][0];
        cell.id = days[j];
      } else {
        var date_current = (i - 1) * 7 + j - start;
        cell.innerText =
          date_current < 1 || date_current > date_end ? '' : date_current;
        cell.id = date_current.toString();
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  selected.setMonth(date.getMonth());
}

function nextMonth(date) {
  date.setMonth(date.getMonth() + 1, 1);
  generateCalendar(date);
}

function previousMonth(date) {
  date.setMonth(date.getMonth() - 1, 1);
  generateCalendar(date);
}

var d = new Date();
var selected = new Date();

function twoDigit(n) {
  return n < 10 ? '0' + n : n;
}

document.addEventListener('DOMContentLoaded', event => {
  d.setMonth(d.getMonth(), 1);
  generateCalendar(d);

  document.getElementById('dates').addEventListener('click', e => {
    if (e.target.tagName == 'TD' && days.indexOf(e.target.id) == -1) {
      document.getElementById(
        selected.getDate().toString()
      ).style.backgroundColor = 'white';
      selected.setDate(parseInt(e.target.id));
      e.target.style.backgroundColor = '#aaccff';

      var datestring =
        selected.getFullYear().toString() +
        twoDigit(selected.getMonth() + 1) +
        twoDigit(selected.getDate());

      var entry = localStorage.getItem(datestring);
      document.getElementById("entry").value = entry;
      
      /*var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById('entry').value = this.responseText;
        }
      };
      xhttp.open('GET', datestring, true);
      xhttp.send();*/
    }
  });
});

function update() {
  var datestring =
    selected.getFullYear().toString() +
    twoDigit(selected.getMonth() + 1) +
    twoDigit(selected.getDate());
  var entry = document.getElementById('entry').value;

  localStorage.setItem(datestring, entry);

  /*var xhttp = new XMLHttpRequest();

  json = {};
  json.date = datestring;
  json.entry = entry;

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      alert(this.responseText);
    }
  };
  xhttp.open('GET', 'date/' + encodeURIComponent(JSON.stringify(json)), true);
  xhttp.send();*/
}
