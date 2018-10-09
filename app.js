import {render} from './render.js';
import {time} from './time.js';


$('header').text(`${time.getMonth()} ${time.getYear()}`)
render.renderMonthlyView();
  
$('#month-btn').on('click', function(e) {
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#month-btn').addClass('active');
    render.renderMonthlyView();
});
$('#week-btn').on('click', function(e) {
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#week-btn').addClass('active');
    render.renderWeeklyView();
});
$('#day-btn').on('click', function (e){
    $('#tbl').children().remove();
    $('li.active').removeClass('active');
    $('#day-btn').addClass('active');
    render.renderDailyView();
});