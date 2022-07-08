import luxon from "../luxon.min.js";
const holidayObjs = {
    'sb.22': { name: 'Spring Break 2022', start: 'March 11 2022', end: '18 March 2022', hoursPerWeek:40, weeks: 'all' },
    'summer.22': { name: 'Summer 2022', start: 'May 16 2022', end: 'August 28 2022', hoursPerWeek:40, weeks: 'all' },
    'winter.22': { name: 'Winter 2022', start: 'December 19 2022', end: 'January 20 2023', hoursPerWeek:20, weeks: 'all' },
    'sb.23': { name: 'Spring Break 2023', start: 'March 11 2023', end: '18 March 2023', hoursPerWeek:40, weeks: 'all' },
    'summer.23': { name: 'Summer 2023', start: 'May 16 2023', end: 'August 28 2023', hoursPerWeek:40, weeks: 'all' },
    'winter.23': { name: 'Winter 2023', start: 'December 19 2023', end: 'January 20 2024', hoursPerWeek:20, weeks: 'all' },
    'sb.24': { name: 'Spring Break 2024', start: 'March 11 2024', end: '18 March 2024', hoursPerWeek:40, weeks: 'all' },
}

const holidays = Object.values(holidayObjs);

export function checkKeyIfHoliday(key) {
    if(/^summer/.test(key) ||
        /^winter/.test(key) ||
        /^sb/.test(key))
        return true;
    else return false;
}

export function defaultHolidayWork(start, end) {
    if(!(start instanceof Date))
        start = new Date(start);
    if(!(end instanceof Date))
        end = new Date(end);

    const result = {};

    for(let key in holidayObjs) {
        const h = holidayObjs[key];

        if((new Date(h.start) >= start) &&  (new Date(h.end) <= end)) {
            const hStart = luxon.DateTime.fromISO(new Date(h.start).toISOString());
            const hEnd = luxon.DateTime.fromISO(new Date(h.end).toISOString());

            const maxWeeks = hEnd.diff(hStart, 'weeks').toObject().weeks;
            result[key] = {
                ...h,
                hoursPerWeek: 40,
                maxWeeks
            }
        }
    }

    return result;
}

export default holidays
