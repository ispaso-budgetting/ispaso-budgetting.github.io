import vuexStore from './vuex.js';
import defaultValues from './defaultValues.js';

import {defaultHolidayWork, breakHousing, checkKeyIfHoliday} from '/utils/holidays.js';
import { semesters, sessions } from '/utils/semesters.js';

import {set, save} from './set.js';
import {retrieve} from './retrieve.js';

import "/globals.js";

let initState = 0;

function _reset() {
    initState = 0;
    vuexStore.commit('reset')
}

export default {
    save, set,
    retrieve,
    get: retrieve,
    _reset,
}
