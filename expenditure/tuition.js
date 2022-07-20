import store from 'store';
import * as budgetPeriod from '/budget/budgetPeriod.js';
import luxon from '/dependencies/luxon.min.js';

function getTotal() {
// export default function(semesters) {
    const yearlyTuition = 31200;

    const period = store.get('budgetPeriod');
    const { session, semesters } = period;
    console.log('session:', session);
    /*
    let sessions = gradDate.year - startDate.year;

    if(startDate < gradDate)
        sessions += 0.5;
    else if(startDate > gradDate)
        sessions -= 0.5;
    console.log('sessions:', sessions);

    // let sessions = (new Date(gradDate - startDate))/(1000 * 3600 * 24 * 365.25);
    */

    return (semesters.length) * yearlyTuition;
}

export default {
    getTotal
}
