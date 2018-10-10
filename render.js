import {time} from './time.js';
import {generate} from './time.js';
import {db} from './database.js';


const addDailySlots = (table) => {
    for (let hours = 9; hours <= 18; hours++) {
        const calendarSlot = $(`<tr><td class="dailySlot">${hours}:00-${hours+1}:00</td><td></td></tr>`);
        table.append(calendarSlot);
    }
}
const addWeeklySlots = (table) => {
    for (let hours = 9; hours <= 18; hours++) {
        const calendarSlot = $(`<tr><td class="dailySlot">${hours}:00-${hours+1}:00</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>`);
        table.append(calendarSlot);
    }
}

const render = {
    renderMonthlyView: (currentMonth, currentYear) => {
        const table = $('<table class="table table-bordered table-responsive"><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></table>');
        $('#tbl').append(table);

        let generateMonthDays = generate.generateCalendarDays(currentMonth, currentYear);
        let counterDays = 0;

        for (let weeks = 1; weeks < 6; weeks++) {
            const week = $('<tr></tr>')
            for (let days = 1; days <= 7; days++) {
                const events = db.find(currentYear, currentMonth, generateMonthDays[counterDays]);
                let appendEventsHtml = '';
                $.each(events, function(index, value) {
                    appendEventsHtml += '<a href="javascript:;" class="event-item" data-json=\''+JSON.stringify(value)+'\'>'+value.title+'</a>';
                });
                let html = `<div> <a href="javascript:;" class="js-add-event" data-year="${currentYear}" data-month="${currentMonth + 1}" data-day="${generateMonthDays[counterDays]}">${generateMonthDays[counterDays]}</a> <div class="day-events">${appendEventsHtml}</div></div>`;
                const dayElement = $('<td></td>').append(html);
                week.append(dayElement);
                counterDays++;
            }
            table.append(week);
        }
    },
    renderWeeklyView: () => {
        const table = $('<table class="table table-bordered table-responsive"><tr><th></th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></table>');

        $('#tbl').append(table);
        const week = $('<tr></tr>')
        for (let days = 0; days <= 7; days++) {
            const dayElement = $('<td></td>').append(`<div>${days}</div>`);
            week.append(dayElement);
        }
        table.append(week);
        addWeeklySlots(table);
    },
    renderDailyView: () => {
        const table = $(`<table class="table table-bordered table-responsive"><tr><th colspan="2">${time.getDayOfTheWeek()}</th></tr><tr><td colspan="2">${time.getDayOfTheMonth()}</td></tr></table>`);

        $('#tbl').append(table);
        addDailySlots(table);
    },
}

export {
    render
};