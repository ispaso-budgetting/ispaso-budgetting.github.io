import Vuex from '../vuex4.js'

import calcAgeBracket from '../utils/ageBracket.js';
import { save as saveData, retrieve as retrieveData, reset as resetData } from './localStorage.js';
import defaultValues from './defaultValues.js';

let getters = {}, mutations = {};

for(const key in defaultValues) {
    getters[key] = (state) => state[key] || defaultValues[key]
    mutations[key] = (state, payload) => {
        if(payload)
            state[key] = payload
    }
}

getters.sessionHourlyWage = getters.hourlyWage;

// AGE
mutations.birthdate = function(state, payload) {
    state.birthdate = payload
    if(state.ageBracket)
        state.ageBracket = null;
}

getters.breakWorkHours = (state) => state.weeklyHours.breaks;
getters.sessionWorkHours = (state) => parseFloat(state.sessionHoursPerWeek);
getters.hourlyWage = (state) => parseFloat(state.hourlyWage);

mutations.breakWorkHours = (state, payload) => (payload) ? state.weeklyHours.breaks = payload : 40;

mutations.sessionWorkHours = (state, payload) =>  state.sessionHoursPerWeek;

mutations.weeklyHours = (state, payload) => {
    mutations.sessionWorkHours = payload.session; 
}

mutations.hourlyWage = (state, payload) => (payload) ? state.hourlyWage = payload : null;

// BUDGETING
mutations.budgetPeriod = (state, payload) => state.budgetPeriod = payload;

const store = Vuex.createStore({
    state() {
        defaultValues
    },
    getters,
    mutations: {
        ...mutations,
        reset: (state) => Object.assign(state, defaultValues),
        finAid: (state, payload) => state.finAid = payload,

        gradDate(state, payload) {
            state.gradDate = { ...payload };
        },
    },

    actions: {
        saveToLocalStorage({ state }) {
            for(const key in state) {
                saveData(key, state[key]);
            }
        },

        loadState({ state,  commit }) {
            for(const key in defaultValues) {
                const data = retrieveData(key);

                commit(key, data);
            }
        }
    }
});

export function _reset() {
    state = {}
}
export default store;
