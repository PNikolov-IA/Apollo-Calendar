import { render } from './render.js';
import { time } from './time.js';
import { generate } from './time.js';
import { db } from './database.js';


let currentMonth = new Date().getMonth();
let currentYear = time.getYear();
generate.currentMonthAndYear[0] = currentMonth;
generate.currentMonthAndYear[1] = currentYear;

//------- helper func ------------------------------
const clearView = () => {
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
};

//------- Initial-View load (monthly - View) ------------------------------
$('header').text(`${time.getMonthByNumber(currentMonth)} ${currentYear}`);
$('.table-container>button').addClass('month-context');
$('.table-container>button').removeClass('week-context');
render.renderMonthlyView(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);

// ------ Monthly-View load from the navbar ------------------------------------
$('#month-btn').on('click', function (e) {
    clearView();
    $($(this)).addClass('active');
    $('.table-container>button').addClass('month-context');
    $('.table-container>button').removeClass('week-context');
    render.renderMonthlyView(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);
});

// ------- Weekly-View load from the navbar --------------------------------------
$('#week-btn').on('click', function (e) {
    clearView();
    $($(this)).addClass('active');
    $('.table-container>button').addClass('week-context');
    $('.table-container>button').removeClass('month-context');
    generate.generateAllWeeksMatrix(generate.currentMonth, generate.allWeekDaysMatrix);
    //generate.firstWeek(generate.currentMonth);                         // set to the firs week
    generate.currentDayWeek(generate.currentDay);                        // set to the week with the current date 
    render.renderWeeklyView(generate.currentWeekDays);
});


// --------- Dayly-View load from the navbar----------------------------------------
$('#day-btn').on('click', function (e) {
    clearView();
    $($(this)).addClass('active');
    render.renderDailyView(time.getDayOfTheWeek(), time.getDayOfTheMonth());
});

//-------------Daily-View load when date is clicked within the Monthly-View
$('#tbl').on('click', 'td.day-in-month', function() {
    clearView();
    const dayOfMonth = $(this).attr('data-day');
    const dayOfWeek = $(this).attr('day-of-week');
    const [month, year] = $('header').text().split(' ');
    $('header').text(`${month} ${year}`);
    $('#day-btn').addClass('active');
    render.renderDailyView(dayOfWeek, dayOfMonth);
});

// -------------Prev/Next UI Controls------------------

$(".table-container")
    .on('click', '#preview-btn.month-context', function (currentMonth, currentYear) {
        [currentMonth, currentYear] = generate.prevMonth(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);
        generate.currentMonthAndYear[0] = currentMonth;
        generate.currentMonthAndYear[1] = currentYear;

        $('header').text(`${time.getMonthByNumber(currentMonth)} ${currentYear}`)
        render.renderMonthlyView(currentMonth, currentYear);

        $('#tbl').children().remove();
        render.renderMonthlyView(currentMonth, currentYear);
    })
    .on('click', '#next-btn.month-context', function (currentMonth, currentYear) {
        [currentMonth, currentYear] = generate.nextMonth(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);
        generate.currentMonthAndYear[0] = currentMonth;
        generate.currentMonthAndYear[1] = currentYear;
    
        $('header').text(`${time.getMonthByNumber(currentMonth)} ${currentYear}`)
        render.renderMonthlyView(currentMonth, currentYear);
    
        $('#tbl').children().remove();
        render.renderMonthlyView(currentMonth, currentYear);
    })
    .on('click', '#preview-btn.week-context', function (e) {
        $('#tbl').children().remove();
        generate.prevWeek();                                  // change the week
        render.renderWeeklyView(generate.currentWeekDays);
    })
    .on('click', '#next-btn.week-context', function (e) {
        $('#tbl').children().remove();
        generate.nextWeek();                                   // change the week
        render.renderWeeklyView(generate.currentWeekDays);
    });

//-------------Event Modal shows on .daily-event click
$(document).on('click', '.daily-event',function (e) {
    $('#addEventModal').find('form')
        .append('<input type="hidden" name="year" value="'+$(this).data('year')+'">')
        .append('<input type="hidden" name="month" value="'+$(this).data('month')+'">')
        .append('<input type="hidden" name="day" value="'+$(this).data('day')+'">')
        .append('<input type="hidden" name="hour" value="'+$(this).data('hour')+'">');
        $('#addEventModal input[name="title"]').val('');
        $('#addEventModal textarea[name="description"]').val('');
    $('#addEventModal').modal('show');
});

//-------------On Submit btn click in the Event Modal form the event is stored in LS 
$(document).on('submit', '#addEventModal form',function (e) {
    e.preventDefault();
    let data = $(this).serializeArray();
    let jsonData = {};
    $.each(data, function(index, value) {
        jsonData[value.name] = value.value;
    });
    $(`td.daily-event[data-year="${jsonData.year}"][data-month="${jsonData.month}"][data-day="${jsonData.day}"][data-hour="${jsonData.hour}"]`).text(jsonData.title).addClass('event-item').removeClass('daily-event');
    db.write(jsonData);
    $('#addEventModal').modal('hide');
});

//-------------Preview/Delete Event Modal is shown on click of .event-item 
$(document).on('click', '.event-item',function (e) {
    let eventElement = $(this);
    console.log(eventElement);
    let timeObj = $(this)[0].dataset;
    let eventInDB = db.find(timeObj.year, timeObj.month, timeObj.day, timeObj.hour)[0];
    let title = eventInDB.title;
    let description = eventInDB.description;

    $('#viewEventModal .modal-body').html('').append(`<h3>${title}</h3><p>${description}</p>`);
    $('#viewEventModal').modal('show');

    //---------------Deletes the event from LS if Delete btn is clicked
    $(document).on('click', '#viewEventModal .delete-event',function (e) {
            db.delete(timeObj.year, timeObj.month, timeObj.day, timeObj.hour);
            eventElement.removeClass('event-item').addClass('dailySlot').text('');
            $('#viewEventModal').modal('hide');
        });
});