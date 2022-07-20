import store from 'store';
import * as budgetPeriod from '/budget/budgetPeriod.js';
import luxon from "../luxon.min.js";
import holidays from '/data/holidays.js';

let numSessionWeeks, numHolidayWeeks;

function _getTotal(dateTime0, dateTime1) {
    const sessionHourlyWage = store.get('sessionHourlyWage'),
        sessionHoursPerWeek = store.get('sessionHoursPerWeek'),
        incomeTax = store.get('incomeTax');

    let oneDay = luxon.Duration.fromObject({days: 1});

    const periodInterval = luxon.Interval.fromDateTimes(dateTime0, dateTime1);

    // console.log('\n\nstart:', dateTime0.toFormat('ff'), '\nend:', dateTime1.toFormat('ff'));

    numSessionWeeks = dateTime1.diff(dateTime0, 'weeks').toObject().weeks;
    numHolidayWeeks = 0;

    let totalHours = 0;

    const holidayWork = store.get('holidayWork') || {};
    for(let holID in holidays) {
        const hol = holidays[holID];

        // holiday end is also calculated inclusively.
        const holStart = luxon.DateTime.fromJSDate(new Date(hol.start));
        const holEnd = luxon.DateTime.fromJSDate( new Date(hol.end)).plus(oneDay);
        const holidayInterval = luxon.Interval.fromDateTimes(holStart, holEnd);

        if(holidayInterval.overlaps(periodInterval)) {
            // console.log(hol.name, 'Holiday Start:', holStart.toFormat('ff'), '\nHoliday End:', holEnd.toFormat('ff'));
            // console.log(dateTime0.toFormat('ff'), '<',  holStart.toFormat('ff'), '<', dateTime1.toFormat('ff'));

            let weeks;

            const overlap = holidayInterval.intersection(periodInterval); 

            weeks = overlap.length('weeks');

            // console.log('Weeks in holiday:', weeks);
            let hPerWeek = 0;

            if(holidayWork[holID]) {
                hPerWeek = holidayWork[holID].hoursPerWeek;
            }

            numSessionWeeks -= weeks;
            totalHours += (hPerWeek * weeks);
        }
    }

    // console.log('Total Holiday hours:', totalHours);

    // const semesterHours = store.getters.sessionWorkHours;
    const semesterHours = sessionHoursPerWeek;
    const hourlyWage = sessionHourlyWage;

    // return (holidayHours * numHolidayWeeks) + (semesterHours * numSessionWeeks);

    totalHours += (semesterHours * numSessionWeeks);

    // console.log('Total session hours:', (semesterHours * numSessionWeeks));

    // const incomeTax = store.getters.incomeTax;

    return parseFloat( ((totalHours * hourlyWage) * (1 - (incomeTax/100))).toFixed(2) )
}

function getTotal() {
    let start = today();
    let end = budgetPeriod.getEndDate();

    let oneDay = luxon.Duration.fromObject({days: 1});

    start = luxon.DateTime.fromJSDate(start);
    end = luxon.DateTime.fromJSDate(end).endOf('month');

    return _getTotal(start, end);
}

function getTotalForMonth(month, year) {
    let start = new Date(month + ' ' + year);
    let end = new Date(month + ' ' + year);
    let oneDay = luxon.Duration.fromObject({days: 1});

    start = luxon.DateTime.fromJSDate(start);
    end = luxon.DateTime.fromJSDate(end).endOf('month');

    return _getTotal(start, end);
}

export default {
    getTotal,
    getTotalForMonth
}
