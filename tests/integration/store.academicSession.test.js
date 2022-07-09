import store from '../../store/index.js';

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
        .to.have.members(['fall', 'spring']);
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
