import vuexStore from './vuex.js';
import defaultValues from './defaultValues.js';

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

    let value = vuexStore.getters[key];
    if(value == null)
        value = defaultValues[key];

    return value;
}

function save_key_value(key, value) {
    vuexStore.commit(key, value);
}

function save_many(obj) {
    for(const key in obj) {
        const value = obj[key];
        save_key_value(key, value)
    }
}

export default {
    save: function(param1, value) {
        if(param1 && value)
            save_key_value(param1, value)
        else if(typeof param1 == 'object' && param1 != null) {
            save_many(param1);
        }
        vuexStore.dispatch('saveToLocalStorage');
    },

    retrieve,
    get: retrieve,
    _reset,
}
