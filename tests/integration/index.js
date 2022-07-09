// Save and clear local storage
let storage = { ...window.localStorage };

import store from '/store/index.js';
import vuexStore from '/store/vuex.js';
import getDefaultValues from '/store/defaultValues.js';

beforeEach(() => {
    window.localStorage.clear()
    vuexStore.replaceState(getDefaultValues());
    store._reset()
});

import './income.test.js';
import './store.academicSession.test.js';
import './store.holiday.test.js';
import './store.holiday.work.test.js';
import './store.holiday.breakHousing.test.js';
import './store.general.test.js';
import './store.localStorage.test.js';
import './budget.report.test.js';
import "/globals.js";

window.localStorage.clear();

for (const key in storage) {
    const value = storage[key];
    window.localStorage.setItem(key, value)
}
