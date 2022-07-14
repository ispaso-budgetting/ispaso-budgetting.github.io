import { budgetPeriods, semesters, sessions } from '/utils/semesters.js';

import vuexStore from './vuex.js';

export function endSemesterDate() {
    const sessionID = vuexStore.getters.academicSession;
    const session = (sessionID) ? sessions[sessionID] : Object.values(sessions)[0];
    const storedSemesters = Object.keys(vuexStore.getters.semesters);
    // console.log('s

    const endSemesterName = storedSemesters.includes('spring') ? 'spring' : 'fall';
    // const endSemester = session[endSemesterName];
    const endSemester = session[endSemesterName];
    // console.log('end semester:', endSemester, 'sem name:', endSemesterName, budgetPeriods, sessions);

    const end = new Date(endSemester.end);
    // console.log('end:', end);

    return end;
}
