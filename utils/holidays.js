import luxon from "../luxon.min.js";
const holidayObjs = {
    'sb.22': { name: 'Spring Break 2022', start: 'March 11 2022', end: '18 March 2022' },
    'summer.22': { name: 'Summer 2022', start: 'May 16 2022', end: 'August 28 2022' },
    'winter.22': { name: 'Winter 2022', start: 'December 18 2022', end: 'January 21 2023' },
    'sb.23': { name: 'Spring Break 2023', start: 'March 12 2023', end: '18 March 2023' },
    'summer.23': { name: 'Summer 2023', start: 'May 16 2023', end: 'August 28 2023', },
    'winter.23': { name: 'Winter 2023', start: 'December 19 2023', end: 'January 20 2024' },
    'sb.24': { name: 'Spring Break 2024', start: 'March 11 2024', end: '18 March 2024' },
}

const holidays = Object.values(holidayObjs);

export function checkKeyIfHoliday(key) {
    if(/^summer/.test(key) ||
        /^winter/.test(key) ||
        /^sb/.test(key))
        return true;
    else return false;
}

function returnPeriodOverlap(p1, p2) {
    if(!p1.start || !p1.end)
        throw new Error('argument 1 is missing its start and/or end periods');
    if(!p2.start || !p2.end)
        throw new Error('argument 2 is missing its start and/or end periods');

    let start1 = p1.start,
        end1=p1.end;
    let start2 = p2.start, end2=p2.end;

    if(!(start1 instanceof Date))
        start1 = new Date(start1);
    if(!(end1 instanceof Date))
        end1 = new Date(end1);

    if(!(start2 instanceof Date))
        start2 = new Date(start2);
    if(!(end2 instanceof Date))
        end2 = new Date(end2);

    start1 = luxon.DateTime.fromISO(start1.toISOString());
    end1 = luxon.DateTime.fromISO(end1.toISOString()).endOf('day');
    const i1 = luxon.Interval.fromDateTimes(start1, end1);

    start2 = luxon.DateTime.fromISO(start2.toISOString());
    end2 = luxon.DateTime.fromISO(end2.toISOString()).endOf('day');
    const i2 = luxon.Interval.fromDateTimes(start2, end2);

    return i1.intersection(i2);
}

function returnCurrentHolidays(start, end) {
    if(!(start instanceof Date))
        start = new Date(start);
    if(!(end instanceof Date))
        end = new Date(end);

    start = luxon.DateTime.fromISO(start.toISOString());
    end = luxon.DateTime.fromISO(end.toISOString()).endOf('day');

    const periodInterval = luxon.Interval.fromDateTimes(start, end);
    const result = {};

    for(let key in holidayObjs) {
        const h = holidayObjs[key];
        const hStart = luxon.DateTime.fromISO(new Date(h.start).toISOString());
        const hEnd = luxon.DateTime.fromISO(new Date(h.end).toISOString()).endOf('day');

        const holidayInterval = luxon.Interval.fromDateTimes(hStart, hEnd);

        if(holidayInterval.overlaps(periodInterval)) {
            result[key] = {
                ...h,
                hoursPerWeek: 40,
            }
        }
    }

    return result;
}

export function breakHousing(start, end) {
    const result = returnCurrentHolidays(start, end);

    for(let key in result) {
        const h = holidayObjs[key];

        const hStart = luxon.DateTime.fromISO(new Date(h.start).toISOString());
        const hEnd = luxon.DateTime.fromISO(new Date(h.end).toISOString()).endOf('day');

        const i = luxon.Interval.fromDateTimes(hStart, hEnd);

        let maxNights = hEnd.diff(hStart, 'days').toObject().days;

        if(maxNights % 1 > 0.96)
            maxNights = Math.ceil(maxNights);

        result[key] = {
            ...h,
            maxNights
        }
    }

    return result;
}

export function defaultHolidayWork(start, end) {
    const result = returnCurrentHolidays(start, end);

    for(let key in result) {
        const h = holidayObjs[key];

        const hStart = luxon.DateTime.fromISO(new Date(h.start).toISOString());
        const hEnd = luxon.DateTime.fromISO(new Date(h.end).toISOString()).endOf('day');

        const i = returnPeriodOverlap({start,end}, {start:h.start, end:h.end});

        let maxWeeks = i.length('weeks');
        if(maxWeeks % 1 > 0.86)
            maxWeeks = Math.ceil(maxWeeks);

        result[key] = {
            ...h,
            hoursPerWeek: 40,
            maxWeeks
        }
    }

    return result;
}

export default holidays
