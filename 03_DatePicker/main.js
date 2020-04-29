const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;
let selectedDay = day;
let selectedMonth = month;
let selectedYear = year;

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;
let amount_days = daysInMonth(month, year);

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);
days_element.addEventListener('click', collapseDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTION
function toggleDatePicker(e) {
    console.log(e.path)
    if(!checkEventPathForClass(e.path, 'dates')){
        dates_element.classList.toggle('active');
    }
}

function collapseDatePicker(e){
    if(checkEventPathForClass(e.path, 'dates')){
        dates_element.classList.toggle('active');
    }
}

function goToNextMonth(e) {
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function goToPrevMonth(e) {
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    mth_element.textContent = months[month] + ' ' + year;
    populateDates();
}

function populateDates (e) {
    days_element.innerHTML = '';

    amount_days = daysInMonth(month, year);

    // if(amount_days == 28){
    //     amount_days = 31;
    // }

    for(let i=0; i<amount_days; i++){
        const day_element = document.createElement('div');
        day_element.classList.add('day');
        // day.element.textContent = days[i];
        day_element.textContent = i+1;
        
        if(selectedDay == (i+1) && selectedYear == year && selectedMonth == month){
            day_element.classList.add('selected');
        }

        day_element.addEventListener('click', function() {
            selectedDate = new Date(year + '-' + (month+1) + '-' + (i+1));
            selectedDay = (i+1);
            selectedMonth = month;
            selectedYear = year;

            selected_date_element.textContent = formatDate(selectedDate);
            selected_date_element.dataset.value = selectedDate;

            populateDates();
        });

        days_element.appendChild(day_element);
    }
}


// HELPER FUNCTION
function checkEventPathForClass(path, selector){
    for(let i = 0; i<path.length; i++){
        if(path[i].classList && path[i].classList.contains(selector)){
            return true;
        }
    }
    return false;
}

function formatDate(d) {
    let day = d.getDate();
    if(day < 10){
        day = '0' + day;
    }
    let month = d.getMonth() + 1;
    if(month < 10){
        month = '0' + month;
    }

    let year = d.getFullYear();

    return day + ' / ' + month + ' / ' + year;
}

function daysInMonth (month, year) {
    return new Date(year, month+1, 0).getDate();
}