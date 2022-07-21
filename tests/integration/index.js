// Save and clear local storage
let storage = { ...window.localStorage };

import './prinbill.budget.js';
import './budgetPeriod.test.js';
import './breakHousing.test.js';
import './store.holiday.test.js';
import './store.general.test.js';
import './store.localStorage.test.js';
import './budget.report.test.js';
import "/globals.js";
import './income.studentEmployment.test.js';

window.localStorage.clear();

for (const key in storage) {
    const value = storage[key];
    window.localStorage.setItem(key, value)
}
