function saveData(key, rawData) {
    console.log('saving', key, 'to localStorage');
    let data = rawData;

    if(data == null)
        return null;

    if (typeof data == 'object')
        data = JSON.stringify(rawData);
    console.log('data:', data);

    window.localStorage.setItem(key, data);
}

function retrieveData(key) {
    const rawData = window.localStorage.getItem(key);
    console.log('key:', key);
    console.log('window.localStorage', window.localStorage);
    let data = rawData;

    console.log('data:', data);

    if(rawData[0] == '{' && rawData[rawData.length - 1] == '}')
        data = JSON.parse(rawData);

    return data;
}

const store = Vuex.createStore({
    state() {
        return {
            finAid: 0,
            gradDate: null,
            birthdate: null,
            ageBracket: null
        }
    },
    getters: {
        gradDate(state) {
            const gradDate = state.gradDate || {month: null, year: null}

            return gradDate
        },
        ageBracket(state) {
            if(!state.birthdate && state.ageBracket)
                return state.ageBracket;
            else return null;
        },
        finAid(state) {
            console.log('stae.finAid:', state.finAid);
            return state.finAid || 0;
        }
    },
    mutations: {
        gradDate(state, payload) {
            state.gradDate = { ...payload };
        },
        finAid(state, payload) {
            state.finAid = payload
        },
    },

    actions: {
        save({ state }) {
            saveData('gradDate', state.gradDate);
            saveData('finAid', state.finAid);
        },

        loadState({ commit }) {
            const keys = ['gradDate', 'finAid'];

            for (const key of keys) {
                // console.log('key:', key);
                const data = retrieveData(key);

                commit(key, data);
            }
        }
    }
});

export default store;
