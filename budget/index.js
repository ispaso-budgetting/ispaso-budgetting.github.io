import store from 'store';

/*
 * Returns the end date of the current budgetting period set by student
 */
export const budgettingPeriod = {
    endDate() {
        const sessionID = store.get('budgetPeriod');
        const session = (sessionID) ? sessions[sessionID] : Object.values(sessions)[0];
        const storedSemesters = Object.keys(vuexStore.getters.semesters);
        const endSemesterName = storedSemesters.includes('spring') ? 'spring' : 'fall';
        // const endSemester = session[endSemesterName];
        const endSemester = session[endSemesterName];
        // console.log('end semester:', endSemester, 'sem name:', endSemesterName, budgetPeriods, sessions);

        const end = new Date(endSemester.end);
        // console.log('end:', end);

        return end;
    }
}
