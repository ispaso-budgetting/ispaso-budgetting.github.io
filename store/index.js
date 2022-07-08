import vuexStore from './vuex.js';
import defaultValues from './defaultValues.js';

import {defaultHolidayWork, checkKeyIfHoliday} from '/utils/holidays.js';
import { semesters, sessions } from '/utils/semesters.js';

import "/globals.js";

let initState = 0;

function _reset() {
    initState = 0;
    vuexStore.commit('reset')
}

function loadState() {
    if(initState == 0) {
        vuexStore.dispatch('loadState');
        initState = 1;
    }
}

function retrieve(key) {
    loadState();
    let value;

    switch(key) {
        case 'holidayWork':
        case 'holidayHours':
            value = {};

            const savedHolidays = vuexStore.getters.holidayWork;
            const b = vuexStore.getters.budgetPeriod;
            const end = new Date(semesters[b].end);
            const defaultHolidays = defaultHolidayWork(today(), end);
            const userDefinedHolidays = {...vuexStore.getters.holidayWork};

            for(let h in defaultHolidays) {
                const uh = userDefinedHolidays[h];
                value[h] = defaultHolidays[h];
                if(uh) {
                    value[h] = {
                        ...value[h],
                        ...uh
                    }
                }
            }
            break;

        default:
            const defaults = defaultValues();
            value = vuexStore.getters[key];
            if(value == null)
                value = defaults[key];
            break;
    }

    return value;
}

function save_key_value(key, value, value1) {
    switch(key) {
        case 'hoursPerWeek':
            if(checkKeyIfHoliday(value))
                vuexStore.commit('holidayWorkHours', {key: value, value: value1});
            break;
        case 'workWeeksAvailable':
            if(checkKeyIfHoliday(value)) {
                const b = vuexStore.getters.budgetPeriod;
                const end = new Date(semesters[b].end);
                const defaultHolidays = defaultHolidayWork(today(), end);

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
        default:
            vuexStore.commit(key, value);
            break;
    }
}

function save_many(obj) {
    for(const key in obj) {
        const value = obj[key];
        save_key_value(key, value)
    }
}
function save(param1, value, value1) {
    if(param1 && value)
        save_key_value(param1, value, value1)
    else if(typeof param1 == 'object' && param1 != null) {
        save_many(param1);
    }
    vuexStore.dispatch('saveToLocalStorage');
}

export default {
    save, set: save,
    retrieve,
    get: retrieve,
    _reset,
}
