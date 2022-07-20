import luxon from '/dependencies/luxon.min.js';
import store from 'store';
import monthArray from '/utils/monthArray.js';

// EXPENDITURE
import breakHousing from 'expenditure/breakHousing.js';
import insurance from 'expenditure/insurance.js';
import tuition from 'expenditure/tuition.js';
import roomBoard from 'expenditure/roomBoard.js';
import tax from 'expenditure/tax.js';
import miscPrin from 'expenditure/miscPrin.js';
/*
*/

// INOOME
import finAid from 'income/finAid.js';
import studentEmployment from 'income/studentEmployment.js';
import extraIncome from 'income/extraIncome.js';

import '/globals.js';
import * as budgetPeriod from '/budget/budgetPeriod.js';

/* Returns a payment plan for the prinbill.
 * Does this by calculating the expenses that go on prinbill, and subtracts those from total income
 * EXPENSES:
 *  break housing,
 *  tuition,
 *  international tax,
 *  r&b
 *  extra prin fees
 *  insurance
 * INCOME:
 *  Student employment
 *  Extra income sources as indicated by student
 *  financial aid
 *      
 */

export function getPaymentPlan() {
    const grossExpenses = breakHousing.getTotal() + insurance.getTotal() + tuition.getTotal() + miscPrin.getTotal();
    const netExpenses = finAid.getTotal() - grossExpenses;
    console.log('totalExpenxes:', netExpenses);

    let start = today();
    const end = budgetPeriod.getEndDate();
    const recommendedEnd = luxon.DateTime.fromJSDate(end).plus({ months: -1 });

    let months = luxon.Interval.fromDateTimes(
        luxon.DateTime.fromJSDate(start),
        recommendedEnd
    ).toDuration('months').toObject().months;

    if(months % 1 > 0.8)
        months = Math.ceil(months);

    let totalIncomeTillDeadline = 0;
    console.log('total income:', totalIncomeTillDeadline);

    const plan = [ ];

    Array.from({length: months}).fill(0).forEach((_ignore, i) => {
        const dur = luxon.Duration.fromObject({ months: i });
        const currentTime = luxon.DateTime.fromJSDate(start).plus(dur);

        const year = currentTime.year;
        const monthName = currentTime.monthLong;

        const totalIncomeForMonth = studentEmployment.getTotalForMonth(monthName, year)
            + extraIncome.getTotalForMonth(monthName, year);

        totalIncomeTillDeadline += totalIncomeForMonth;

        plan.push({
            month: monthName + ' ' + year, totalIncomeForMonth
        });
    });

    plan.forEach(p => {
        const amount = (p.totalIncomeForMonth / totalIncomeTillDeadline) * netExpenses
        p.amount = parseFloat(amount.toFixed(2));
        delete p.totalIncomeForMonth;
    });

    return plan;
}
