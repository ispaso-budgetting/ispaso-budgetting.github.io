import { semesters, sessions } from '/utils/semesters.js';

import vuexStore from './vuex.js';

export function endSemesterDate() {
    const sessionID = vuexStore.getters.academicSession;
    const session = (sessionID) ? sessions[sessionID] : Object.values(sessions)[0];
    const storedSemesters = vuexStore.getters.semesters;

    const endSemesterName = storedSemesters.includes('spring') ? 'spring' : 'fall';
    const endSemester = session[endSemesterName];

    const end = new Date(endSemester.end);

    return end;
}
