// Save and clear local storage
import store from '/store/index.js';
import vuexStore from '/store/vuex.js';
import getDefaultValues from '/store/defaultValues.js';
import { resetStub } from '../stubs/store.js';

var rootHooks = {
    beforeEach:() => {
        resetStub();
        window.localStorage.clear()
        vuexStore.replaceState(getDefaultValues());
        store._reset()
    }
}

window.rootHooks = rootHooks;
