import otherSources from '../../income/otherSources.js'

describe('Extra Income', function() {
    it('extraIncome: Don\'t fail on null values', function() {
        let extraIncome = [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: null},
            {name: 'Awards', date: new Date(), amount: null},
        ]

        let ans = otherSources(extraIncome);

        expect(ans).to.equal(2000);
    });

    it('extraIncome: calculate extra income', function() {
        let extraIncome = [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: 2000},
            {name: 'Awards', date: new Date(), amount: 1286},
        ]

        let ans = otherSources(extraIncome);

        expect(ans).to.equal(5286);
    });

    it('extraIncome: return total income for month', function() {
        let extraIncome = [
            {name: 'Family', date: new Date('july 2'), amount: 2000},
            {name: 'Stipends', date: new Date('dec 23'), amount: 1100},
            {name: 'Awards', date: new Date('jun 1'), amount: 520},
            {name: 'Awards', date: new Date('jun 30'), amount: 520},
            {name: 'Awards', date: new Date('aug 1'), amount: 2310},
            {name: 'Awards', date: new Date('july 3'), amount: 1000},
            {name: 'Awards', date: new Date('july 25'), amount: 1200},
        ]

        let jun = otherSources(extraIncome, 'jun');
        let june = otherSources(extraIncome, 'june');
        let july = otherSources(extraIncome, 'july');
        let aug = otherSources(extraIncome, 'aug');
        let august = otherSources(extraIncome, 'august');
        let dec = otherSources(extraIncome, 'dec');

        expect(jun).to.equal(1040);
        expect(june).to.equal(1040);
        expect(july).to.equal(4200);
        expect(aug).to.equal(2310);
        expect(august).to.equal(2310);
        expect(dec).to.equal(1100);
    });
});
