// Tuition, Room and Boarding
// Tuition: $31,200.00 per year
// Room: $6,360.00
// Board (means feeding): $6,510.00
// Other Fees: $930 (tech, athletics, student activities)
// ie total = $45,000.00
// courses with fees
// insurance: countries with tax treaties, age brackets
// programmes that sponsor students during breaks
import store from '../store.js';
import * as insurance from './insurance.js';

export function tax() {
}

export function upcomingExpenditure() {
    // calculates expenditure for current semester, or upcoming expenditure if
    // student is not in session.
}

export function totalExpenditure(gradDate, age) {
    const today = new Date();
    let sessions = (gradDate.year - today.getFullYear());

    // if(today.getMonth() == 7) // August
    if(gradDate.month == 11)
        sessions += 0.5;
    
    if(today.month > 7)
        sessions -= 0.5;

    if(sessions == 0)
        return 0; // Invalid graduation date 

    console.log('Sessions:', sessions);
    console.log('Semesters:', sessions * 2);

    const tuition = 31200, room = 6360, board = 6510, otherFees = 930;

    /*
    let expenditure = tuition * sessions;

    expenditure += room + board + otherFees;
    */
    let expenditure = (tuition + room + board + otherFees) * sessions;

    // Insurance
    expenditure += insurance.yearly(age);

    return expenditure;
}

export function calcPrinbill(gradDate, insurance, age) {
    let expenditure = 0
    const semesters = 2
    tuition = 26000 * semesters;

    expenditure = tuition;

    return expenditure;
}
export default {
    calcPrinbill,
}
