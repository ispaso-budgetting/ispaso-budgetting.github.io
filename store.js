const store = Vuex.createStore({
    state() {
        return {
            finAid: 0,
            gradDate: null,
        }
    },
    getters: {
        gradDate(state) {
            const gradDate = state.gradDate || {month: null, year: null}

            return gradDate
        }
    },
    mutations: {
        gradDate(state, payload) {
            state.gradDate = { ...payload };
        }
    }
});

export default store;
