import { room as _room, board as _board } from '../utils/index.js';
import store from 'store';

import * as budgetPeriod from '/budget/budgetPeriod.js';
import luxon from '/dependencies/luxon.min.js';


// Room and Board
export let room = _room;
export let board = _board;

function getTotal() {
    const period = store.get('budgetPeriod');
    const { session, semesters } = period;

    const numSessions = semesters.length / 2;

    room *= numSessions;
    board *= numSessions;

    return room + board;
}

export default {
    getTotal
}


