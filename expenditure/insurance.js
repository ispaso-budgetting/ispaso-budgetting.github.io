import store from 'store';
import * as budgetPeriod from '/budget/budgetPeriod.js';
import luxon from '/dependencies/luxon.min.js';

function getTotal() {
    let monthlyPremium = 62;

    let start = today();
    const end = budgetPeriod.getEndDate();

    let months = luxon.Interval.fromDateTimes(
        luxon.DateTime.fromJSDate(start),
        luxon.DateTime.fromJSDate(end)
    ).toDuration('months').toObject().months;

    if(months % 1 > 0.8)
        months = Math.ceil(months);

    return monthlyPremium * months;
}

export default {
    getTotal
}
