import vuexStore from './vuex.js';
import defaultValues from './defaultValues.js';

import {loadState} from './utils.js';
import {defaultHolidayWork, checkKeyIfHoliday} from '/utils/holidays.js';
import { budgetPeriods, semesters, sessions } from '/utils/semesters.js';
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
