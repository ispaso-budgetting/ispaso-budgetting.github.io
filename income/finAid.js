import store from 'store';

function getTotal() {
    return store.get('finAid');
}

export default {
    getTotal
}
