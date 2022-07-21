import store_ from '/store/index.js';

let get = store_.get;
let retrieve = store_.retrieve;
let save = store_.save;
let set = store_.set;
let _reset = store_._reset;

let functions = {
    get,
    retrieve,
    save,

    set,
    _reset,
}

export function resetStub() {
    functions.get = store_.get;
    functions.retrieve = store_.retrieve;
    functions.save = store_.save;
    functions.set = store_.set;
    functions._reset = store_._reset;
}

export { functions as default }
