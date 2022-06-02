import calculateIncome, { frozenIncome, freeIncome } from '../income/index.js';
import calculateExpenditure, { totalExpenditure } from '../expenditure/index.js';
import store from '../store/index.js';

export let total = {income: 0, expenditure: 0};

export function monthly(timePeriod = 'monthly') {
    const budgetPeriod = store.getters.budgetPeriod;
    // console.log(budgetPeriod);
    const semester = budgetPeriod.split('.')[0];
    const year = budgetPeriod.split('.')[1];

    console.log('semester:', semester);
    let start = new Date(), end = new Date();

    if(semester == 'spring') {
        start = 'Jan 1, ' + year; // Jan 1 - July 31
        end = 'July 31, ' + year;
    } else {
        start = 'August 1 ' + year; // Aug - Dec
        end = 'December 31 ' + year;
    }

    start = new Date(start + ' UTC').toISOString();
    end = new Date(end + ' UTC').toISOString();

    const countSemesters = 1;
    calculateIncome(start, end, countSemesters);
    calculateExpenditure(start, end, countSemesters);

    const months = ['June', 'July', 'August'];
    const monthly = [];

    const income = freeIncome;
    const expenditure = totalExpenditure - frozenIncome;
    total.diff = (income - expenditure).toFixed(2);

    total.income = income.toFixed(2);
    total.expenditure = expenditure.toFixed(2);

    months.forEach(month => {
        const data = {};
        data.name = month;
        data.income = (freeIncome / months.length).toFixed(2);
        data.expenditure = (expenditure / months.length).toFixed(2);
        data.diff = (data.income - data.expenditure).toFixed(2);

        monthly.push(data);
    });

    return monthly;
}
