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

        case 'breakHousing':
            const defaultBreakHousing = breakHousing(today(), end);
            if(typeof value == 'object') {
                for(let holidayID in value) {
                    const h = defaultBreakHousing[holidayID];
                    const maxNights = h.maxNights;

                    const nights = value[holidayID].nights;

                    if(!isNaN(nights) && nights > maxNights)
                        value[holidayID].nights = h.maxNights;

                    if(/^\d+\.?\d+%/.test(nights)) {
                        const nightsPercentFloat = parseFloat(nights);

                        if(nightsPercentFloat >= 100)
                            value[holidayID].nights = h.maxNights;
                        else value[holidayID].nights = nightsPercentFloat / 100 * h.maxNights;
                    }

                    vuexStore.commit('breakHousing', value);
                }
            }
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
