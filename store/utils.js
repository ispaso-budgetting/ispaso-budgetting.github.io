import vuexStore from './vuex.js';

let initState = 0;

export function _reset() {
    initState = 0;
    vuexStore.commit('reset')
}

export function loadState() {
    if(initState == 0) {
        vuexStore.dispatch('loadState');
        initState = 1;
    }
}


