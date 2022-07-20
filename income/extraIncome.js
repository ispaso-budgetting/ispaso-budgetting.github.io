import * as budgetPeriod from '/budget/budgetPeriod.js';
import store from 'store';
/**
 * params
 *  - data = store.extraIncome
 */

function _getTotal(start, end) {
    console.log('start, ', start, 'end', end);
    let months = [];
    let total = 0;

    const data = store.get('extraIncome');

    // else if(typeof period == 'object' && period.start && period.end) {

    data.forEach(d => {
        if(months.length > 0) {
            months.forEach(month => {
                if(typeof month =='number') {
                    if(month == d.date.getMonth())
                        total += d.amount;
                }
            });
        } else if(start && end) {
            console.log('checking if overlap', d.date);
            if(start <= d.date && d.date <= end)
                total += d.amount;
        }
        else if(!period)
            total += d.amount;
    });

    return total;
}

function getTotal() {
    let start = today();
    const end = budgetPeriod.getEndDate();

    return _getTotal(start, end);
}

function getTotalForMonth(month, year) {
    let start = new Date(month + ' ' + year);
    let end = new Date(year, start.getMonth() + 1, 0);

    return _getTotal(start, end);
}

export default {
    getTotal,
    getTotalForMonth
}
