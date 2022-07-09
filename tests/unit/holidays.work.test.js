import {defaultHolidayWork} from '/utils/holidays.js';

describe('Holiday work hours: Unit tests', function() {
    it('Set work hours for each holiday to 40 by default', function() {
        const start = new Date('aug 29 2022');
        const end = new Date('may 15 2024');

        const res = defaultHolidayWork(start, end);

        expect(res).to.not.be.empty;

        Object.values(res).forEach(h => expect(h.hoursPerWeek).to.equal(40));
    });

    it('Set "work weeks" to 100% by default');

    it('Calculate number of weeks (maxWeeks) in holiday', function() {
        const start = new Date('aug 29 2022');
        const end = new Date('may 15 2024');

        const res = defaultHolidayWork(start, end);

        // expect(res).to.have.keys('winter.22', 'sb.23');

        expect(res['winter.22']).to.have.property('maxWeeks', (4 + (4/7)));
        expect(res['sb.23']).to.have.property('maxWeeks', 1);
    });
});
