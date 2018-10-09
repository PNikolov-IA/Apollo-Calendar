import { render } from './render.js';
import { time } from './time.js';
import { generate } from './time.js';

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