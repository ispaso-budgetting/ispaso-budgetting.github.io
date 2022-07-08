import getMonths from './getMonths.js';
import calculateIncome, { frozenIncome, freeIncome } from '../income/index.js';
import calculateExpenditure, { totalExpenditure } from '../expenditure/index.js';

export let total = {income: 0, expenditure: 0};

export function monthly(start, end, timePeriod = 'monthly') {
    const countSemesters = 1;
    calculateIncome(start, end, countSemesters);
    // calculateExpenditure(start, end, countSemesters);

    const months = getMonths(start, end);
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
