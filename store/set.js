import vuexStore from './vuex.js';
import defaultValues from './defaultValues.js';

import {defaultHolidayWork, breakHousing, checkKeyIfHoliday} from '/utils/holidays.js';
import { semesters, sessions } from '/utils/semesters.js';
import { endSemesterDate } from './calculations.js';

import "/globals.js";

function setKeyValue(key, value, value1) {
    const end = endSemesterDate();

    switch(key) {
        case 'hoursPerWeek':
            if(checkKeyIfHoliday(value))
                vuexStore.commit('holidayWorkHours', {key: value, value: value1});
            break;
        case 'workWeeksAvailable':
            const defaultHolidays = defaultHolidayWork(today(), end);
            if(checkKeyIfHoliday(value)) {
                let weeks, maxWeeks = defaultHolidays[value].maxWeeks;

                if(/^\d+%$/.test(value1))
                    weeks = maxWeeks * parseFloat(value1)/100;

                else if(!isNaN(value1)) {
                    weeks = parseFloat(value1);
                }

                if(weeks > maxWeeks)
                    weeks = maxWeeks;

                vuexStore.commit('holidayWorkWeeksAvailable', {key: value, value: weeks});
            }

            break;

        case 'semesters':
            if(Array.isArray(value)) {
                const commitObj = {};
                value.forEach(semID => {
                    commitObj[semID] = {};
                });

                vuexStore.commit('semesters', commitObj);
            } else if(typeof value == 'object') {
                vuexStore.commit('semesters', value);
            }
            break;
        default:
            vuexStore.commit(key, value);
            break;
    }
}

function setMany(obj) {
    for(const key in obj) {
        const value = obj[key];
        setKeyValue(key, value)
    }
}

export function set(param1, value, value1) {
    if(param1 && value)
        setKeyValue(param1, value, value1)
    else if(typeof param1 == 'object' && param1 != null) {
        setMany(param1);
    }
}

export function save(param1, value, value1) {
    set(param1, value, value1);
    vuexStore.dispatch('saveToLocalStorage');
}
