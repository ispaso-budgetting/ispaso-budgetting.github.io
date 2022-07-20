/*
import '/dependencies/vue3.global.js';
import '/dependencies/vuex4.js'
*/
// import _store from '/store/index.js';

import storeStub from './store.js';
import * as insuranceStub from './expenditure/insurance.js';

let store, insurance;

export function resetStubs() {
    store = storeStub;
    insurance = insuranceStub;
}


export default {
    store,

    insurance
}
