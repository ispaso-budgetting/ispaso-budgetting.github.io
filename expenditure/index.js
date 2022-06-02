import { finAid } from '../income/index.js';
import insurance from './insurance.js';
import tuition from './tuition.js';
import store from '../store/index.js';
import roomBoard from './roomBoard.js';
import miscPrin from './miscPrin.js';
import tax from './tax.js';

export let totalExpenditure;

export default function(start, end, semesters) {
    /*
    const ageBracket = (store.getters.birthdate) ? 
        calcAgeBracket(store.getters.birthdate) : store.getters.ageBracket;
    */
    const sessions = semesters / 2;

    const dt0 = luxon.DateTime.fromISO(start);
    const dt1 = luxon.DateTime.fromISO(end);
    let months = dt1.diff( dt0, 'months' );
    months = months.toObject().months;

    totalExpenditure = tuition(semesters);
    totalExpenditure += roomBoard(sessions);
    totalExpenditure += miscPrin(sessions);

    totalExpenditure += tax(finAid(), totalExpenditure);
    totalExpenditure += insurance(store.getters.birthdate, store.getters.ageBracket, months);

    /*
    const ageData = store.getters.birthdate || store.getters.ageBracket;
    const totalYears = tuition.total();
    */

    return totalExpenditure;
}
