import store from '../store.js';

function earningsDuringHolidays(holidays, weeklyHours, hourlyWages) {
}

function earningsDuringSemesters(weeklyHours, wages) {
}

function calculateTotal(holidays, holidayHours, semesters, semesterHours) {
    return earningsDuringSemesters(semesters, semesterHours, wages) + earningsDuringHolidays(holidays, holidayHours, wages);
}

export default function() {
    // spring break
    // summer
    // christmas

    const holidays = [{
        name: 'Spring Break', start: 'March 11', end: '18 March'
    }, {
        name: 'Summer', start: 'May 15', end: 'August 29'
    }, {
        name: 'Christmas', start: 'December 15', end: 'January 21'
    }];

    const holidayHours = store.getters.weeklyHours.holiday;
    const semesterHours = store.getters.weeklyHours.semester;

    return 0;
}
