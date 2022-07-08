import {defaultHolidayWork} from '/utils/holidays.js';

describe('Holiday work hours: Unit tests', function() {
    it('Each holiday should have the right title', function() {
        const start = new Date('aug 29 2000');
        const end = new Date('may 15 2034');

        const res = defaultHolidayWork(start, end);

        expect(res).to.include.keys('sb.22', 'summer.22', 'winter.22', 
            'sb.23', 'summer.23', 'winter.23', 
            'sb.24',// 'summer.24', 'winter.24', 
        );

        for(let key in res) {
            const abbr = key.replace(/[^a-zA-Z]+/, '');
            const year = '20' + key.match(/\d+/)[0];

            let holidayName = (abbr == 'sb') ? 'Spring Break' :
                abbr[0].toUpperCase() + abbr.substring(1);

            holidayName += ' ' + year;
            expect(res[key]).to.have.property('name', holidayName);
        }
    });

    it('Return holidays for current budgeting period', function() {
        const jan22 = new Date('jan 1 2022');
        const feb23 = new Date('feb 2 2023');

        let res = defaultHolidayWork(jan22, feb23);

        expect(res).to.have.keys('sb.22', 'summer.22', 'winter.22');
        let holidayNames = Object.values(res).map(h => h.name);

        expect(holidayNames).to.have.members([
            'Spring Break 2022', 'Summer 2022', 'Winter 2022']);


        const aug22 = new Date('aug 29 2022');
        const may23 = new Date('may 15 2023');

        res = defaultHolidayWork(aug22, may23);

        expect(res).to.have.keys('winter.22', 'sb.23');
        holidayNames = Object.values(res).map(h => h.name);

        expect(holidayNames).to.have.members(['Winter 2022', 'Spring Break 2023']);
    });

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
