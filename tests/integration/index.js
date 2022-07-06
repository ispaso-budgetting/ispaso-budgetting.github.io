// Save and clear local storage
let storage = { ...window.localStorage };
window.localStorage.clear();

import './income.test.js';
import './store.test.js';
import './store.localStorage.test.js';
import './budget.report.test.js';

window.localStorage.clear();

for (const key in storage) {
    const value = storage[key];
    window.localStorage.setItem(key, value)
}
