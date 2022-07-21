import store from 'store';
import { sessions } from '/data/sessions.js';

export function setBudgetPeriod(data_) {
    const data = {};

    if(data_.semesters) {
        data.semesters = data_.semesters;
    }
    if(data_.session) {
        data.session = data_.session;
    }

    store.save('budgetPeriod', data);
}

export function getBudgetPeriod() {
    let ans = store.get('budgetPeriod');

    if(!ans) {
        ans = {}
    }

    if(!ans.session)
        ans.session = '22/23';

    if(!ans.semesters)
        ans.semesters = [];
    if(ans.semesters.length < 1)
        ans.semesters = ['fall', 'spring'];

    return ans;
}

export function getEndDate() {
    let budgetPeriod = getBudgetPeriod();

    if(!budgetPeriod.session)
        throw new Error('Budget period not set');

    let sessionInfo = sessions[budgetPeriod.session];
    const storedSemesters = budgetPeriod.semesters;
    const endSemesterName = storedSemesters.includes('spring') ? 'spring' : 'fall';

    let end = new Date(sessionInfo[endSemesterName].end);

    return end;
}
