import store from '../../store/index.js';

describe('App store: Holiday Work', function() {
    beforeEach(() => {
        // Set today to Jan 20, 2022
        window.today = () => new Date('jan 20, 2022');

        store.set('academicSession', '22/23');
        store.set('semesters', ['spring']);
    });

    it('When saving holiday work, save even for holidays that are not part of session');

    it('Return max weeks available as default', function() {
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('hoursPerWeek', 40);
        expect(holidayWork).to.have.property('summer.23').that.has.property('hoursPerWeek', 40);
        expect(holidayWork).to.have.property('summer.23').that.has.property('maxWeeks', 11);
    });

    it('Set and retrieve hoursPerWeek for holidays', function() {
        store.set('hoursPerWeek', 'winter.22', 14);
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('hoursPerWeek', 14);
        expect(holidayWork).to.have.property('summer.23').that.has.property('hoursPerWeek', 40);
    });

    it('Set weeksAvailable(percent)', function() {
        store.set('workWeeksAvailable', 'winter.22', '100%');
        expect( store.get('holidayWork') ).to.have.property('winter.22').that.has.property('weeksAvailable', 5);

        store.set('workWeeksAvailable', 'winter.22', '50%');
        expect( store.get('holidayWork') ).to.have.property('winter.22').that.has.property('weeksAvailable', 2.5);
    });

    it('Set weeksAvailable as number', function() {
        store.set('workWeeksAvailable', 'winter.22', 4);
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('weeksAvailable', 4);
    });

    it('Set weeksAvailable(percent) - if percent exceeds 100%, set to maxWeeks', function() {
        store.set('workWeeksAvailable', 'winter.22', '105%');
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('weeksAvailable', 5);
    });

    it('Set weeksAvailable(num) - if num exceeds maxWeeks, set to maxWeeks', function() {
        store.set('workWeeksAvailable', 'winter.22', 6);
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('weeksAvailable', 5);
    });
});
