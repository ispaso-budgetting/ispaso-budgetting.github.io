import finAid from './finAid.js';
import studentEmployment from './studentEmployment.js';
import extraIncome from './extraIncome.js';
import store from '../store/index.js';

// Frozen income is income that belongs to the student, but they can't decide how to spend it. Financial aid, for example, is frozen income. 
// Free income is income that the student can choose how, where and when to spend it.
// It is important to make this decision because we don't want to imply to students that they have more cash to spend than they do.

export let frozenIncome = finAid.getTotal();
export let freeIncome;

export default function(start, end) {
    const result = { };
    let ans;
    freeIncome = 0;

    console.log('START:', start);
    console.log('end:', end);
    let period = {start, end}
    if(/^\w+$/.test(start) || !end)
        period = start;

    console.log('period:', period);

    const sessionHourlyWage = store.retrieve('sessionHourlyWage');
    const incomeTax = store.retrieve('incomeTax');
    const sessionHoursPerWeek = store.retrieve('sessionHoursPerWeek');

    frozenIncome = finAid();
    // Student employment
    ans = studentEmployment(period, sessionHourlyWage, sessionHoursPerWeek, incomeTax );
    result.studentEmployment = ans;
    freeIncome += ans;

    // console.log('STUDENT EMPLOYEMENT', period, freeIncome);
    ans = extraIncome(store.get('extraIncome'), period);
    result.extra = ans;
    freeIncome += extraIncome(store.get('extraIncome'), period);

    result._total = freeIncome;
    return result;
}

export { finAid }
