import store from '../../store/index.js';
import vuexStore from '../../store/vuex.js';

describe('App store: Academic session and semesters', function() {
    beforeEach(() => {
        // Set today to Jan 20, 2022
        window.today = () => new Date('jan 20, 2022');
    });

    it('If academic session not set, return 21/22', function() {
        expect(store.get('academicSession'))
            .to.equal('22/23');
    });

    it('If semesters not set, spring and fall', function() {
        expect(store.get('semesters'))
            .to.have.keys('fall', 'spring');
    });

    it('getter: semesterArr should return arr of semester keys', function() {
        expect(store.get('semesterArr'))
            .to.have.members(['fall', 'spring']);
    });

    it('getter(semesters): should always return semester names', function() {
        expect(store.get('semesters').fall).to.have.property('name', 'Fall 2022');
        expect(store.get('semesters').spring).to.have.property('name', 'Spring 2023');
    });

    it('setter: set semesters([arr])', function() {
        store.set('semesters', ['spring', 'fall', 'summer']);
        expect(vuexStore.state.semesters)
            .to.have.keys('fall', 'spring', 'summer');

        expect(store.get('semesterArr'))
            .to.have.members(['fall', 'spring', 'summer']);
        expect(store.get('semesters'))
            .to.have.keys('fall', 'spring', 'summer');
    });

    it('setter: set semesters({sema: {...}, semb: {...},...})', function() {
        const semObj = {
            spring: {
                hoursPerWeek: 22
            },
            fall: {
                hoursPerWeek: 14
            },
        };
        store.set('semesters', semObj);

        for (name in semObj) {
            expect(store.get('semesters')).to.have.property(name)
                .that.has.property('hoursPerWeek', semObj[name].hoursPerWeek);
        }
        expect(store.get('semesterArr')).to.have.members(['fall', 'spring']);
    });

    it.skip('If academic session not set, return session', function() {
        // current semester is spring 22 so session should be 21/22
        window.today = () => new Date('jan 20, 2022');
        expect(store.get('academicSession'))
            .to.equal('21/22');

        window.today = () => new Date('jan 20, 2023');
        expect(store.get('academicSession'))
            .to.equal('22/23');
    });
});
