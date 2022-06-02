import calcAgeBracket from '../utils/ageBracket.js';
import saveData from './saveData.js';
import retrieveData from './retrieveData.js';

const store = Vuex.createStore({
    state() {
        return {
            finAid: 0,
            startDate: null,
            gradDate: null,
            birthdate: null,
            ageBracket: null
        }
    },
    getters: {
        startDate(state) {
            const startDate = state.startDate || {month: null, year: null}

            return startDate
        },
        gradDate(state) {
            const gradDate = state.gradDate || {month: null, year: null}

            return gradDate
        },
        birthdate(state) {
            return state.birthdate;
        },
        ageBracket(state) {
            if(!state.birthdate && state.ageBracket)
                return state.ageBracket;
            else if(state.birthdate)
                return calcAgeBracket(state.birthdate);
            else return null;
        },
        finAid(state) {
            return state.finAid || 0;
        }
    },
    mutations: {
        birthdate(state, payload) {
            state.birthdate = payload
        },
        startDate(state, payload) {
            state.startDate = { ...payload };
        },
        gradDate(state, payload) {
            state.gradDate = { ...payload };
        },
        finAid(state, payload) {
            state.finAid = payload
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
                console.log('\nloading state:', 'KEY:', key);
                // saveData(key, state[key]);
                const data = retrieveData(key);
                console.log('DATA:', data);

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
