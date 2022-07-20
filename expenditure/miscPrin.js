// Atheletics, tech, student activities

import { miscPrin } from '../utils/index.js';
import * as budgetPeriod from '/budget/budgetPeriod.js';
import store from 'store';

function getTotal() {
    const sessions = 1;
    return miscPrin * sessions;
}

export default {
    getTotal
}
