import luxon from "../luxon.min.js";
import { holidays } from '../utils/index.js';

let numSessionWeeks, numHolidayWeeks;

export default function(period, sessionHourlyWage, sessionHoursPerWeek, incomeTax) {
    if(!sessionHourlyWage || !sessionHoursPerWeek || !incomeTax)
        throw new Error("Missing param")

    let start, end; // end is inclusive. So if you say, start = jun 21, end = jun 27, then you have a week, and 7 days.

    if(period) {
        if(period.start && period.end) {
            if(period.start instanceof Date
                && period.end instanceof Date)
                ({start, end} = period);
            else throw new Error('Invalid period');
        }
        else if(typeof period == 'string') {
            let month, year = (new Date()).getUTCFullYear();

            if(/^\w+$/.test(period)) {
                month = period
                if( (new Date(month + ' 2000')).getMonth()
                    < (new Date()).getMonth())
                    year = year + 1

                start = new Date('1 ' + period + ' ' + year);
                end = new Date(year, start.getMonth() + 1, 0)
            }
        } else throw new Error('Invalid period');
    } else throw new Error('Set period to calculate student employment');

    let oneDay = luxon.Duration.fromObject({days: 1});

    const dateTime0 = luxon.DateTime.fromISO(start.toISOString());
    const dateTime1 = luxon.DateTime.fromISO(end.toISOString()).plus(oneDay);
    // console.log('\n\nstart:', dateTime0.toFormat('ff'), '\nend:', dateTime1.toFormat('ff'));

    numSessionWeeks = dateTime1.diff(dateTime0, 'weeks').toObject().weeks;
    numHolidayWeeks = 0;

    let totalHours = 0;

    holidays.forEach(hol => {
        // holiday end is also calculated inclusively.
        const holStart = luxon.DateTime.fromISO( new Date(hol.start).toISOString());
        const holEnd = luxon.DateTime.fromISO( new Date(hol.end).toISOString()).plus(oneDay);

        // console.log('\n', hol.name, '\nHoliday Start:', holStart.toFormat('ff'), '\nHoliday End:', holEnd.toFormat('ff'));

        /*
        console.log(dateTime0.toFormat('ff'), '<',  holStart.toFormat('ff'));
        console.log(dateTime0 < holStart)
        console.log(holStart.toFormat('ff'), '<', dateTime1.toFormat('ff'));
        console.log(holStart < dateTime1)

        console.log(holStart.toFormat('ff'), '<', dateTime0.toFormat('ff'), '<', holEnd.toFormat('ff'));
        console.log(holStart <= dateTime0 && dateTime0 <= holEnd)
        */
        
        if(holStart <= dateTime0 && dateTime0 <= holEnd) { // if the start time for period is between holiday start and holiday end
            // console.log(hol.name, 'Holiday Start:', holStart.toFormat('ff'), '\nHoliday End:', holEnd.toFormat('ff'));
            // console.log(dateTime0.toFormat('ff'), '<',  holStart.toFormat('ff'), '<', dateTime1.toFormat('ff'));

            let weeks;

            if(holEnd < dateTime1) // if holiday ends sooner than the end of the period
                weeks = holEnd.diff(dateTime0, 'weeks').toObject().weeks;
            else
                weeks = dateTime1.diff(dateTime0, 'weeks').toObject().weeks;

            // console.log('Weeks in holiday:', weeks);
            numSessionWeeks -= weeks;
            totalHours += (hol.hoursPerWeek * weeks);

        }
    });

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
