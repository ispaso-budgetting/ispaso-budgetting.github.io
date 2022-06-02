import periods from './periods.js';
import { total, monthly } from './calculate.js';

export const budgetPeriods = periods;

export const totalBudget = total;

export let monthlyBudget;

export function calculateBudget(timePeriod = 'monthly') {
    if(timePeriod == 'monthly')
        monthlyBudget = monthly();
}
