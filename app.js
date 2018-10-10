import { render } from './render.js';
import { time } from './time.js';
import { generate } from './time.js';
import { db } from './database.js';


let currentMonth = new Date().getMonth();
let currentYear = time.getYear();
generate.currentMonthAndYear[0] = currentMonth;
generate.currentMonthAndYear[1] = currentYear;

$('header').text(`${time.getMonthByNumber(currentMonth)} ${currentYear}`)
render.renderMonthlyView(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);

$('#month-btn').on('click', function (e) {
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#month-btn').addClass('active');
    render.renderMonthlyView(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);
});
$('#week-btn').on('click', function (e) {
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#week-btn').addClass('active');
    render.renderWeeklyView();
});
$('#day-btn').on('click', function (e) {
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#day-btn').addClass('active');
    render.renderDailyView();
});
$(document).on('click', '.js-add-event',function (e) {
    $('#addEventModal').find('form')
        .append('<input type="hidden" name="year" value="'+$(this).data('year')+'">')
        .append('<input type="hidden" name="month" value="'+$(this).data('month')+'">')
        .append('<input type="hidden" name="day" value="'+$(this).data('day')+'">');
        $('#addEventModal input[name="title"]').val('');
        $('#addEventModal textarea[name="description"]').val('');
    $('#addEventModal').modal('show');
});

$(document).on('submit', '#addEventModal form',function (e) {
    e.preventDefault();
    let data = $(this).serializeArray();
    let jsonData = {};
    $.each(data, function(index, value) {
        jsonData[value.name] = value.value;
    });
    
    let day = $(`.js-add-event[data-year="${jsonData.year}"][data-month="${jsonData.month}"][data-day="${jsonData.day}"]`);
    
    if (day.length > 0) {
        day.parent().find('.day-events').append(`<a href="javascript:;" class="event-item" data-json=\'${JSON.stringify(jsonData)}'\'>${jsonData.title}</a>`);
    }
    db.write(jsonData);
    $('#addEventModal').modal('hide');
});

$(document).on('click', '.event-item',function (e) {
    let data = $(this).data('json');
    $('#viewEventModal .modal-body').html('').append(`<h3>${data.title}</h3><p>${data.description}</p>`);
    $('#viewEventModal .delete-event').data('json', data);
    $('#viewEventModal').modal('show');
});

$(document).on('click', '#viewEventModal .delete-event',function (e) {
    let json = $(this).data('json');
    db.delete(json.year, json.month, json.day, json.title);
    let event = $(`.event-item[data-json=\'${JSON.stringify(json)}\']`);
    if (event.length > 0) {
        event.remove();
    }
    $('#viewEventModal').modal('hide');
});

$("#preview-btn").click(function (currentMonth, currentYear) {
    [currentMonth, currentYear] = generate.prevMonth(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);
    generate.currentMonthAndYear[0] = currentMonth;
    generate.currentMonthAndYear[1] = currentYear;

    $('header').text(`${time.getMonthByNumber(currentMonth)} ${currentYear}`)
    render.renderMonthlyView(currentMonth, currentYear);

    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#month-btn').addClass('active');
    render.renderMonthlyView(currentMonth, currentYear);
});

$("#next-btn").click(function (currentMonth, currentYear) {
    [currentMonth, currentYear] = generate.nextMonth(generate.currentMonthAndYear[0], generate.currentMonthAndYear[1]);
    generate.currentMonthAndYear[0] = currentMonth;
    generate.currentMonthAndYear[1] = currentYear;

    $('header').text(`${time.getMonthByNumber(currentMonth)} ${currentYear}`)
    render.renderMonthlyView(currentMonth, currentYear);

    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#month-btn').addClass('active');
    render.renderMonthlyView(currentMonth, currentYear);
});