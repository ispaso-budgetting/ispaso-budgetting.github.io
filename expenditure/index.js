import * as insurance from './insurance.js';
import * as tuition from './tuition.js';
import store from '../store/index.js';

export default function(budgetPeriod) {
}

export function monthlyExpenditure() {
    const ageData = store.getters.birthdate || store.getters.ageBracket;
    console.log('getters:', store.getters);
    const monthlyTuition = tuition.total(store.getters.startDate, store.getters.gradDate) / 12;

    console.log(insurance.monthly(ageData));
    return insurance.monthly(ageData) + monthlyTuition;
}

export function yearlyExpenditure() {
    return monthlyExpenditure() * 12;
}

export function totalExpenditure() {
    const totalYears = tuition.total();

    return yearlyExpenditure() * totalYears;
}
