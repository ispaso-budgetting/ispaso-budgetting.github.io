import finAid from './finAid.js';
import studentEmployment from './studentEmployment.js';

export let frozenIncome = finAid();
export let freeIncome;

export default function(start, end) {
    frozenIncome = finAid();

    freeIncome = studentEmployment(start, end);
}

export { finAid }
