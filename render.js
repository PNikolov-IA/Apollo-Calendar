import {time} from './time.js';



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
const getDaysInMonth = function(month,year) {   
   return new Date(year, month, 0).getDate();
  };
const monthlength = getDaysInMonth(3,2020);  

const render = {
    renderMonthlyView: () => {
        const table = $('<table class="table table-bordered table-responsive"><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></table>');

        $('#tbl').append(table);
        let dayscounter = 0;
        for (let weeks = 1; weeks <= 5; weeks++) {            
            const week = $('<tr></tr>')
            for (let days = 1; days <= 7; days++) {
                if(dayscounter===monthlength){
                    break;
                }
                dayscounter++;
                const dayElement = $('<td></td>').append(`<div>${dayscounter}</div>`);
                week.append(dayElement);
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