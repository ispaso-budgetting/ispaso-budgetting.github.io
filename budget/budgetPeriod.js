import store from 'store';
import { sessions } from '/data/sessions.js';

export function getEndDate() {
    let budgetPeriod = store.get('budgetPeriod'); // current budget period.

    if(!budgetPeriod.session)
        throw new Error('Budget period not set');

    let sessionInfo = sessions[budgetPeriod.session];
    const storedSemesters = budgetPeriod.semesters;
    const endSemesterName = storedSemesters.includes('spring') ? 'spring' : 'fall';

    let end = new Date(sessionInfo[endSemesterName].end);

    return end;
}

export function setBudgetPeriod(data_) {
    const data = {};

    if(data_.semesters) {
        data.semesters = data_.semesters;
    }
    if(data_.session) {
        data.session = data_.session;
    }

    store.save('session', data.session);
    store.save('semesters', data.semesters);
}
