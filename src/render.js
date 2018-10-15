import { time } from './time.js';
import { generate } from './time.js';
import { db } from './database.js';


const addDailySlots = (table) => {
  const [month, year] = $('header').text().split(' ');
  const day = $('td[colspan=2]').text();
  let classOnSlot;
  for (let hours = 9; hours <= 18; hours++) {
    const hr = hours.toString().padStart(2, '0');
    const events = db.findSlot(year, month, day, hr);
        !events[0] ? classOnSlot = 'daily-event': classOnSlot = 'event-item';
        const calendarSlot = $(`<tr hours="${hr}">
                                    <td class="dailySlot">${hr}:00-${hours+1}:00</td><td class="${classOnSlot}" data-year="${year}" data-month="${month}" data-day="${day}" data-hour="${hr}">${events[0] || ''}</td>
                                </tr>`);
        table.append(calendarSlot);
  }
};
const addWeeklySlots = (table) => {
  const year = generate.currentMonthAndYear[1];
  const month = time.months[generate.currentMonthAndYear[0]];
  for (let hours = 9; hours <= 18; hours++) {
    const hr = hours.toString().padStart(2, '0');
    const calendarSlot = $(`<tr hours="${hr}"></tr>`);
    let classOnSlot;
    const weekElements = $(`<td class="dailySlot">${hr}:00-${hours+1}:00</td>`);
    calendarSlot.append(weekElements);
    for (let d = 0; d < 7; d++) {
      const day = generate.currentWeekDays[d];
      const events = db.findSlot(year, month, day, hr);
            !events[0] ? classOnSlot = 'daily-event': classOnSlot = 'event-item';
            const dayElement = $(`<td data-year="${year}" data-month="${month}" data-day="${day}" data-hour="${hr}">${events[0] || ''}</td>`).addClass(classOnSlot);
            calendarSlot.append(dayElement);
    }
    table.append(calendarSlot);
  }
};

const render = {
  renderMonthlyView: (currentMonth, currentYear) => {
    const table = $(`<table class="table table-bordered table-responsive">
                            <tr>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </table>`);
    $('#tbl').append(table);

    const generateMonthDays = generate.generateCalendarDays(currentMonth, currentYear);
    generate.currentMonth = generateMonthDays;
    let counterDays = 0;
    for (let weeks = 1; weeks < 6; weeks++) {
      const week = $('<tr></tr>');
      for (let days = 1; days <= 7; days++) {
        const eventCount = db.findEventsCount(currentYear, time.months[currentMonth], counterDays+1);
        const displayCount = eventCount ? `<i class="fa fa-calendar" aria-hidden="true" style="color:#2d9ee0"></i> x ${eventCount}` : '';
        const $dayElement = $(`<td class="day-in-month" data-year="${currentYear}" data-month="${currentMonth}" data-day="${counterDays+1}" day-of-week="${time.weekday[days]}"></td>`); $dayElement.append(`<div>${generateMonthDays[counterDays]}</div><div style="color:#2d9ee0">${displayCount}</div>`);
        week.append($dayElement);
        counterDays++;
      }
      table.append(week);
    }
  },

  renderWeeklyView: (weekDays) => {
    const table = $(`<table class="table table-bordered table-responsive">
                            <tr>
                                <th></th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                                <th>Sun</th>
                            </tr>
                        </table>`);
    $('#tbl').append(table);

    const week = $('<tr></tr>');
    for (let days = 0; days <= 7; days++) {
      let dayElement = 0;
      if (days > 0) {
        dayElement = $('<td></td>').append(`<div>${generate.currentWeekDays[days - 1]}</div>`);
      } else {
        dayElement = $('<td></td>').append(`<div>${''}</div>`);
      }
      week.append(dayElement);
    }
    table.append(week);
    addWeeklySlots(table);
  },
  // My code
  renderDailyView: (dayOfWeek, dayOfMonth) => {
    // $('#preview-btn.month-context').hide();
    // $('#next-btn.month-context').hide();
    // $('#preview-btn.month-context').hide();
    // $('#next-btn.week-context').hide();
    const table = $(`<table class="table table-bordered table-responsive">
                            <tr>
                                <th colspan="2">${dayOfWeek}</th>
                            </tr>
                            <tr>
                                <td colspan="2">${dayOfMonth}</td>
                            </tr>
                        </table>`);
    $('#tbl').append(table);
    addDailySlots(table);
  },


};

export {
  render,
};
