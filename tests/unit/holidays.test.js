import {defaultHolidayWork, breakHousing} from '/utils/holidays.js';

describe('Holiday data: Unit tests', function() {
    [
        {name: 'HolidayWork', fn: defaultHolidayWork},
        {name: 'BreakHousing', fn: breakHousing}
    ].forEach(testArgs => {
        it(testArgs.name + ' - Each holiday should have the right title', function() {
            const start = new Date('aug 29 2000');
            const end = new Date('may 15 2034');

            const res = testArgs.fn(start, end);

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

        it(testArgs.name + ' - Return holidays for current budgeting period', function() {
            const jan22 = new Date('jan 1 2022');
            const feb23 = new Date('feb 2 2023');

            let res = testArgs.fn(jan22, feb23);

            expect(res).to.have.keys('sb.22', 'summer.22', 'winter.22');
            let holidayNames = Object.values(res).map(h => h.name);

            expect(holidayNames).to.have.members([
                'Spring Break 2022', 'Summer 2022', 'Winter 2022']);


            const aug22 = new Date('aug 29 2022');
            const may23 = new Date('may 15 2023');

            res = testArgs.fn(aug22, may23);

            expect(res).to.have.keys('winter.22', 'sb.23');
            holidayNames = Object.values(res).map(h => h.name);

            expect(holidayNames).to.have.members(['Winter 2022', 'Spring Break 2023']);
        });
    });
});
