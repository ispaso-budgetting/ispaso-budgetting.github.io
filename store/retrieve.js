import vuexStore from './vuex.js';
import defaultValues from './defaultValues.js';

import {loadState} from './utils.js';
import {defaultHolidayWork, breakHousing, checkKeyIfHoliday} from '/utils/holidays.js';
import { semesters, sessions } from '/utils/semesters.js';
import { endSemesterDate } from './calculations.js';

import "/globals.js";

function academicSession() {
    let value = vuexStore.getters.academicSession;
    if(value == null) {
        value = '22/23';
    }

    return value;
}

export function retrieve(key) {
    loadState();
    let value;

    const end = endSemesterDate();
    switch(key) {
        case 'holidayWork':
        case 'holidayHours':
            let defaultHolidays = defaultHolidayWork(today(), end);

            value = {};

            const userDefinedHolidays = {...vuexStore.getters.holidays.work};

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

        case 'breakHousing':
            const breakHousingDefaults = breakHousing(today(), end);
            value = vuexStore.getters.holidays.breakHousing;

            const userBreakHousing = {...vuexStore.getters.breakHousing};

            for(let h in breakHousingDefaults) {
                const uh = userBreakHousing[h];
                value[h] = breakHousingDefaults[h];
                if(uh) {
                    value[h] = {
                        ...value[h],
                        ...uh
                    }
                }
            }
            break;

        case 'academicSession':
            value = academicSession();
            break;

        case 'semesters':
        case 'semesterArr':
            value = vuexStore.getters.semesters;

            if(value == null ||
                (typeof value == 'object' && Object.keys(value).length == 0))
                value = { fall:{}, spring: {} };


            const sems = sessions[academicSession()];
            Object.keys(value).forEach(semID => {
                value[semID].name = sems[semID].name;
            });

            if(key == 'semesterArr')
                return Object.keys(value);
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
