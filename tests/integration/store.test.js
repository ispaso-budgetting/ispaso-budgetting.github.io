import store from '../../store/index.js';

describe.only('App store: holidayHours', function() {
    beforeEach(() => {
        // Set today to Jan 20, 2022
        window.today = () => new Date('jan 20, 2022');
    });

    it('getter: Returns all holidays between "today" and end of semester', function() {
        store.set('budgetPeriod', 'spring.22');
        expect( store.get('holidayWork') ).to.have.keys('sb.22');

        store.set('budgetPeriod', 'fall.22');
        expect( store.get('holidayWork') ).to.have.keys('sb.22', 'summer.22');

        store.set('budgetPeriod', 'spring.23');
        expect( store.get('holidayWork') ).to.have.keys('sb.22', 'summer.22', 'winter.22', 'sb.23');
    });

    it('Set and retrieve hoursPerWeek for holidays', function() {
        store.set('budgetPeriod', 'spring.23');
        store.set('hoursPerWeek', 'winter.22', 14);
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('hoursPerWeek', 14);
    });

    it('Set weeksAvailable(percent)', function() {
        store.set('budgetPeriod', 'spring.23');

        store.set('workWeeksAvailable', 'winter.22', '100%');
        expect( store.get('holidayWork') ).to.have.property('winter.22').that.has.property('weeksAvailable', 4 + (4/7));

        store.set('workWeeksAvailable', 'winter.22', '50%');
        expect( store.get('holidayWork') ).to.have.property('winter.22').that.has.property('weeksAvailable', 2 + (2/7));
    });

    it('Set weeksAvailable as number', function() {
        store.set('budgetPeriod', 'spring.23');
        store.set('workWeeksAvailable', 'winter.22', 4);
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('weeksAvailable', 4);
    });

    it('Set weeksAvailable(percent) - if percent exceeds 100%, set to maxWeeks', function() {
        store.set('budgetPeriod', 'spring.23');
        store.set('workWeeksAvailable', 'winter.22', '105%');
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('weeksAvailable', 4 + (4/7));
    });

    it('Set weeksAvailable(num) - if num exceeds maxWeeks, set to maxWeeks', function() {
        store.set('budgetPeriod', 'spring.23');
        store.set('workWeeksAvailable', 'winter.22', 4.6);
        const holidayWork = store.get('holidayWork');

        expect(holidayWork).to.have.property('winter.22').that.has.property('weeksAvailable', 4 + (4/7));
    });
});
