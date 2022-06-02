import calcAgeBracket from '../utils/ageBracket.js';
import saveData from './saveData.js';
import retrieveData from './retrieveData.js';

const state = { }, getters = {}, mutations = {};

// AGE
state.ageBracket = null;
state.birthdate = null;

getters.birthdate = (state) => state.birthdate;

getters.ageBracket = function(state) {
    if(!state.birthdate && state.ageBracket)
        return state.ageBracket;
    else if(state.birthdate)
        return calcAgeBracket(state.birthdate);
    else return null;
}

mutations.ageBracket = function(state, payload) {
    if(!state.birthdate)
        state.ageBracket = payload;
}
mutations.birthdate = function(state, payload) {
    state.birthdate = payload
    if(state.ageBracket)
        state.ageBracket = null;
}

// STUDENT EMPLOYMENT
state.hourlyWage = 12;
state.weeklyHours = {
    session: 20,
    breaks: 40
}

getters.breakWorkHours = (state) => state.weeklyHours.breaks;
getters.sessionWorkHours = (state) => state.weeklyHours.session;
getters.hourlyWage = (state) => state.hourlyWage;

mutations.breakWorkHours = (state, payload) => state.weeklyHours.breaks = payload;
mutations.sessionWorkHours = (state, payload) => state.weeklyHours.session = payload;
mutations.weeklyHours = (state, payload) => {
    if(payload) {
        if(payload.breaks)
            mutations.breakWorkHours = payload.breaks; 
        else if(payload.session)
            mutations.sessionWorkHours = payload.session; 
    }
}

mutations.hourlyWage = (state, payload) => state.hourlyWage = payload;

// BUDGETING
state.budgetPeriod = {};
getters.budgetPeriod = (state) => state.budgetPeriod;
mutations.budgetPeriod = (state, payload) => state.budgetPeriod = payload;

const store = Vuex.createStore({
    state() {
        return {
            ...state,
            finAid: null,
            gradDate: null,
        }
    },
    getters: {
        ...getters,
        finAid(state) {
            return state.finAid;
        },
        gradDate(state) {
            const gradDate = state.gradDate || {month: null, year: null}

            return gradDate
        },

    },
    mutations: {
        ...mutations,
        finAid: (state, payload) => state.finAid = payload,

        gradDate(state, payload) {
            state.gradDate = { ...payload };
        },
    },

    actions: {
        save({ state }) {
            for(const key in state) {
                saveData(key, state[key]);
            }
        },

        loadState({ state,  commit }) {
            for(const key in state) {
                // console.log('\nloading state:', 'KEY:', key);
                const data = retrieveData(key);

                commit(key, data);
            }

            /*
            const keys = ['startDate', 'gradDate', 'finAid', 'birthdate'];

            for (const key of keys) {
                console.log('skey:', key);
                const data = retrieveData(key);

                commit(key, data);
            }
            */
        }
    }
});

export default store;
