import vuexStore from './vuex.js';
import getDefaultValues from './defaultValues.js';
import * as ls from './localStorage.js';

let initState = 0;

export function _reset() {
    initState = 0;
    vuexStore.commit('reset')
}

export function loadState() {
    if(initState == 0) {
        const defaultValues = getDefaultValues();
        for(const key in defaultValues) {
            const data = ls.retrieve(key);

            vuexStore.commit(key, data);
        }
        initState = 1;
    }
}


