import "/globals.js";

import luxon from "/dependencies/luxon.min.js";

import store from 'store';
import holidays from '/data/holidays.js';
import { sessions } from '/data/sessions.js';
import { BREAK_HOUSING_COST_PER_NIGHT as COST_PER_NIGHT } from '/data/costs.js';
import { getEndDate } from '/budget/budgetPeriod.js';

/**
 * Returns the holidays contained in the current budget period
 * and the nights the student will spend in break housing.
 * Default: returns all holidays with nights in break housing set
 * to max number of nights contained in holiday
 */
export function getAllBreakHousing() {
    const savedBreakHousing = store.get('breakHousing');

    let start = today();
    let end = getEndDate();

    start = luxon.DateTime.fromISO(start.toISOString());
    end = luxon.DateTime.fromISO(end.toISOString()).endOf('day');

    const periodInterval = luxon.Interval.fromDateTimes(start, end);
    const result = {};

    for(let key in holidays) {
        const savedNights = savedBreakHousing[key];

        const h = holidays[key];

        const hStart = luxon.DateTime.fromISO(new Date(h.start).toISOString());
        const hEnd = luxon.DateTime.fromISO(new Date(h.end).toISOString()).endOf('day');

        const holidayInterval = luxon.Interval.fromDateTimes(hStart, hEnd);

        if(holidayInterval.overlaps(periodInterval)) {
            let maxNights = hEnd.diff(hStart, 'days').toObject().days;

            if(maxNights % 1 > 0.96)
                maxNights = Math.ceil(maxNights);

            const nights = savedNights || maxNights;

            result[key] = {
                ...h,
                maxNights,
                nights,
                budgetAmount: - COST_PER_NIGHT * nights,
            }
        }
    }

    return result;
}

function getTotal() {
    return Object.values(
        getAllBreakHousing()
    ).reduce((t, item) => t + item.budgetAmount, 0);
}

export function getForMonth(month, year) {
    let start = luxon.DateTime.fromJSDate(new Date(month + ' ' + year));
    let end = start.endOf('month');

    const savedBreakHousing = store.get('breakHousing');

    const periodInterval = luxon.Interval.fromDateTimes(start, end);
    const result = {nights: 0, budgetAmount: 0};

    for(let key in holidays) {
        const savedNights = savedBreakHousing[key];

        if(savedNights) {
            result.nights = savedNights;
        }
        else {

            const h = holidays[key];

            const hStart = luxon.DateTime.fromISO(new Date(h.start).toISOString());
            const hEnd = luxon.DateTime.fromISO(new Date(h.end).toISOString()).endOf('day');

            const holidayInterval = luxon.Interval.fromDateTimes(hStart, hEnd);

            const overlap = holidayInterval.intersection(periodInterval); 

            if(overlap) {
                let nights = overlap.length('day');

                if(nights % 1 > 0.96) {
                    nights = Math.ceil(nights);
                }

                result.nights += nights;
            }
        }
    }

    result.budgetAmount -= COST_PER_NIGHT * result.nights;

    return result;
}

function getCostForMonth() {
}

export function setBreakHousing(data) {
    const toSave = {};

    for(let key in data) {
        toSave[key] = (!isNaN(data[key].nights)) ? data[key].nights : 0;
    }
    store.save('breakHousing', toSave);
}

export default {
    getAllBreakHousing,
    getForMonth,
    setBreakHousing,
    getCostForAll: getTotal,
    getTotal,
    getCostForMonth
}
