import store from '../../store/index.js';
import income, {freeIncome} from '../../income/index.js';

describe('Income', function() {
    const incomeTax = 30;

    const hourlyWage=12, sessionHoursPerWeek = 15;

    const extraIncomeData = [
        {name: 'Family', date: new Date('jun 12, 2022'), amount: 2200},
        {name: 'Stipends', date: new Date('jul 3, 2022'), amount: 1500},
        {name: 'Awards', date: new Date('september 4, 2022'), amount: 1500},
    ];

    const holidays = [
        { name: 'Summer 2022', start: 'May 16 2022', end: 'August 28 2022', hoursPerWeek:40 },
        { name: 'Winter 2022', start: 'December 19 2022', end: 'January 20 2023', hoursPerWeek:20 },
        { name: 'Spring Break 2023', start: 'March 11 2023', end: '18 March 2023', hoursPerWeek:20 },
        { name: 'Summer 2023', start: 'May 16 2023', end: 'August 28 2023', hoursPerWeek:40 },
    ];

    beforeEach(() => {
        window.localStorage.clear()

        let state = {
            holidays,
            extraIncome: extraIncomeData,
            birthdate: new Date('jan 23, 1996'),
            sessionHoursPerWeek,
            hourlyWage, incomeTax,
            budgetPeriod: {},
            finAid: null,
            gradDate: null,
        }

        store.save(state);
    })

    it('Calculate total income should have properties studentEmployment, and extra Income', function() {
        let start = new Date('jun 1 2022');
        let end = new Date('may 15 2023');

        expect(income(start, end) ).to.have.keys('studentEmployment', 'extra', '_total');
    });

    it('Calculate total income', function() {
        // console.log('\n\n');
        const totalExtraIncome = 5200;
        const insessionEarnings = 5837.14;
        const summerEarnings = 6102.86, winterEarnings= 1097.14, springBreak = 240,
            holidayEarnings = (springBreak + summerEarnings + winterEarnings) * (1 - (incomeTax/100));

        // console.log('student employemet in test:', insessionEarnings + holidayEarnings);
        // const totalIncome = insessionEarnings + holidayEarnings + totalExtraIncome;
        const totalIncome = 8952 + totalExtraIncome;

        let start = new Date('jun 1 2022');
        let end = new Date('may 15 2023');

        expect(income(start, end) ).to.have.property('_total', totalIncome);
    });

    it('Calculate total income for month', function() {
        console.log('\n\n');
        const monthIncome = [
            {month: 'june', extra: 2200, grossEarnings: 2057.14}
        ]

        monthIncome.forEach(({month, extra, grossEarnings}) => {
            let expectedIncome = extra + (grossEarnings * (1 - (incomeTax/100)));
            expectedIncome = parseFloat(expectedIncome.toFixed(2));
            expect( income(month) ).to.have.property('_total', expectedIncome);
        });
    });
});
