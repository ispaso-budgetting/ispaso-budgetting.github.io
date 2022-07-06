import extraExpenses from '../../expenditure/studentExtras.js'

describe('Extra Expenditure', function() {
    it('Don\'t fail on null values', function() {
        let extraExpenditure = [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: null},
            {name: 'Awards', date: new Date(), amount: null},
        ]

        let ans = extraExpenses(extraExpenditure);

        expect(ans).to.equal(2000);
    });

    it('calculate custom expenditure', function() {
        let extraExpenditure = [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: 2000},
            {name: 'Awards', date: new Date(), amount: 1286},
        ]

        let ans = extraExpenses(extraExpenditure);

        expect(ans).to.equal(5286);
    });

    it('Return total expenditure for a defined period', function() {
        let extraIncome = [
            {name: 'Family', date: new Date('july 2 2022'), amount: 2000},
            {name: 'Stipends', date: new Date('dec 23 2022'), amount: 1100},
            {name: 'Awards', date: new Date('jun 1 2022'), amount: 520},
            {name: 'Awards', date: new Date('jun 30 2022'), amount: 520},
            {name: 'Awards', date: new Date('aug 1 2022'), amount: 2310},
            {name: 'Awards', date: new Date('july 3 2023'), amount: 1000},
            {name: 'Awards', date: new Date('july 25 2023'), amount: 1200},
        ]

        let cases = [
            {period: {start: new Date('jun 1, 2022'), end: new Date('may 15, 2023')},
                expectedIncome: 6450
            }
        ]

        cases.forEach(({period, expectedIncome}) => {
            expect(extraExpenses(extraIncome, period)).to.equal(expectedIncome);
        });
    });

    it('return total income for month', function() {
        let extraExpenditure = [
            {name: 'Housing', date: new Date('july 2'), amount: 2000},
            {name: 'Outings', date: new Date('dec 23'), amount: 1100},
            {name: 'Transport', date: new Date('jun 1'), amount: 520},
            {name: 'Gaming', date: new Date('jun 30'), amount: 520},
            {name: 'Streaming', date: new Date('aug 1'), amount: 2310},
            {name: 'Gaming', date: new Date('july 3'), amount: 1000},
            {name: 'Transport', date: new Date('july 25'), amount: 1200},
        ]

        let jun = extraExpenses(extraExpenditure, 'jun');
        let june = extraExpenses(extraExpenditure, 'june');
        let july = extraExpenses(extraExpenditure, 'july');
        let aug = extraExpenses(extraExpenditure, 'aug');
        let august = extraExpenses(extraExpenditure, 'august');
        let dec = extraExpenses(extraExpenditure, 'dec');

        expect(jun).to.equal(1040);
        expect(june).to.equal(1040);
        expect(july).to.equal(4200);
        expect(aug).to.equal(2310);
        expect(august).to.equal(2310);
        expect(dec).to.equal(1100);
    });
});
