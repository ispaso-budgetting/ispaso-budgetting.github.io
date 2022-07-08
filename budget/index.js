import periods from './periods.js';
import store from '../store/index.js';
import { total, monthly } from './calculate.js';

export const budgetPeriods = periods;

export const totalBudget = total;

export let monthlyBudget;

export let budgetTitle;

export function calculateBudget(timePeriod = 'monthly') {
    const budgetPeriod = store.get('budgetPeriod');
    // console.log(budgetPeriod);
    const semester = budgetPeriod.split('.')[0];

    const splits = budgetPeriod.split('.');
    let season = splits[0], year = splits[1]

    console.log('semester:', semester);
    let start = new Date(), end = new Date();

    if(semester == 'spring') {
        start = 'Jan 1, ' + year; // Jan 1 - July 31
        end = 'July 31, ' + year;
    } else {
        start = 'August 1 ' + year; // Aug - Dec
        end = 'December 31 ' + year;
    }

    start = new Date(start + ' UTC');
    end = new Date(end + ' UTC');

    budgetTitle = season.charAt(0).toUpperCase() + season.slice(1);
    budgetTitle += ' ' + '20' + year;

    if(timePeriod == 'monthly')
        monthlyBudget = monthly(start, end);
}
