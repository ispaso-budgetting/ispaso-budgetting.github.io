import periods from './periods.js';
import store from '../store/index.js';
import { total, monthly } from './calculate.js';

export const budgetPeriods = periods;

export const totalBudget = total;

export let monthlyBudget;

export let budgetTitle;

export function calculateBudget(timePeriod = 'monthly') {
    const budgetPeriod = store.getters.budgetPeriod;

    const splits = budgetPeriod.split('.');
    let season = splits[0], year = splits[1]

    budgetTitle = season.charAt(0).toUpperCase() + season.slice(1);
    budgetTitle += ' ' + '20' + year;

    if(timePeriod == 'monthly')
        monthlyBudget = monthly();
}
