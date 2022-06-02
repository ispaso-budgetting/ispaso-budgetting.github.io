import store from '../store/index.js';
import { holidays } from '../utils/index.js';

let numSessionWeeks, numHolidayWeeks;

function calculateTotal(holidays, holidayHours, semesters, semesterHours) {
    return earningsDuringSemesters(semesters, semesterHours, wages) + earningsDuringHolidays(holidays, holidayHours, wages);
}

export default function(start, end) {
    // console.log('start:', start, 'end:', end);
    const dateTime0 = luxon.DateTime.fromISO(start);
    const dateTime1 = luxon.DateTime.fromISO(end);
    // console.log('start:', dateTime0.toFormat('ff'), '\nend:', dateTime1.toFormat('ff'));

    numSessionWeeks = dateTime1.diff(dateTime0, 'weeks').toObject().weeks;
    numHolidayWeeks = 0;

    holidays.forEach(hol => {
        const holStart = luxon.DateTime.fromISO( new Date(hol.start).toISOString());
        const holEnd = luxon.DateTime.fromISO( new Date(hol.end).toISOString());

        // console.log('\n', hol.name, '\nHoliday Start:', holStart.toFormat('ff'), '\nHoliday End:', holEnd.toFormat('ff'));

        /*
        console.log(dateTime0.toFormat('ff'), '<',  holStart.toFormat('ff'));
        console.log(dateTime0 < holStart)
        console.log(holStart.toFormat('ff'), '<', dateTime1.toFormat('ff'));
        console.log(holStart < dateTime1)
        */

        // console.log(dateTime0.toFormat('ff'), '<',  holStart.toFormat('ff'), '<', dateTime1.toFormat('ff'));
        // console.log(dateTime0 < holStart && holStart < dateTime1)

        if(dateTime0 < holStart && holStart < dateTime1) {
            // console.log('\n', hol.name, '\nHoliday Start:', holStart.toFormat('ff'), '\nHoliday End:', holEnd.toFormat('ff'));
            // console.log(dateTime0.toFormat('ff'), '<',  holStart.toFormat('ff'), '<', dateTime1.toFormat('ff'));

            let weeks;

            if(holEnd < dateTime1)
                weeks = holEnd.diff(holStart, 'weeks').toObject().weeks;
            else
                weeks = dateTime1.diff(holStart, 'weeks').toObject().weeks;

            numSessionWeeks -= weeks;
            numHolidayWeeks += weeks;
        }
    });

    // console.log('sessionWeeks:', numSessionWeeks);
    // console.log('holidayWeeks:', numHolidayWeeks);

    const holidayHours = store.getters.breakWorkHours;
    const semesterHours = store.getters.sessionWorkHours;
    const hourlyWage = store.getters.hourlyWage;

    console.log('holidayHOurs:', holidayHours);
    console.log('semesterHOurs:', semesterHours);
    // return (holidayHours * numHolidayWeeks) + (semesterHours * numSessionWeeks);

    const totalHours = (holidayHours * numHolidayWeeks) + (semesterHours * numSessionWeeks);

    return totalHours * hourlyWage;
}
