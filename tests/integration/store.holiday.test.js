import store from '../../store/index.js';

describe('App store: Holiday', function() {
    beforeEach(() => {
        // Set today to Jan 20, 2022
        window.today = () => new Date('jan 20, 2022');
    });

    [
        {title: 'HolidayWork', name: 'holidayWork'},
        {title: 'BreakHousing', name: 'breakHousing'},
    ].forEach(testArgs => {
        it(testArgs.title + ' getter: Returns all holidays between "today" and end of semester', function() {
            store.set('academicSession', '21/22');
            store.set('semesters', ['fall', 'spring']);
            expect( store.get(testArgs.name) ).to.have.keys('sb.22');
            store.set('semesters', ['spring', 'fall']);
            expect( store.get(testArgs.name) ).to.have.keys('sb.22');

            store.set('academicSession', '22/23');
            store.set('semesters', ['fall']);
            expect( store.get(testArgs.name) ).to.have.keys('sb.22', 'summer.22');

            store.set('academicSession', '22/23');
            store.set('semesters', ['spring']);
            expect( store.get(testArgs.name) ).to.have.keys('sb.22', 'summer.22', 'winter.22', 'sb.23');
        });
    });
});
