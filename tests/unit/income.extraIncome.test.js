import storeStub from '../stubs/store.js';
import otherSources from '../../income/extraIncome.js'

describe('Income: Custom income', function() {
    it('extraIncome: Don\'t fail on null values', function() {
        let extraIncome = [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: null},
            {name: 'Awards', date: new Date(), amount: null},
        ]

        storeStub.get = (name) => {
            return (name == 'budgetPeriod') ?  { session: "22/23", semesters: ['fall', 'spring']} :
                name == 'extraIncome' ? extraIncome : null
        };

        let ans = otherSources.getTotal(extraIncome);

        expect(ans).to.equal(2000);
    });

    it('extraIncome: calculate extra income', function() {
        let extraIncome = [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: 2000},
            {name: 'Awards', date: new Date(), amount: 1286},
        ]

        storeStub.get = (name) => {
            return (name == 'budgetPeriod') ?  { session: "22/23", semesters: ['fall', 'spring']} :
                name == 'extraIncome' ? extraIncome : null
        };

        let ans = otherSources.getTotal(extraIncome);

        expect(ans).to.equal(5286);
    });

    it('extraIncome: return total income for month', function() {
        let extraIncome = [
            {name: 'Family', date: new Date('july 2, 2022'), amount: 2000},
            {name: 'Stipends', date: new Date('dec 23, 2022'), amount: 1100},
            {name: 'Awards', date: new Date('jun 1, 2022'), amount: 520},
            {name: 'Awards', date: new Date('jun 30, 2022'), amount: 520},
            {name: 'Awards', date: new Date('aug 1, 2022'), amount: 2310},
            {name: 'Awards', date: new Date('july 3, 2022'), amount: 1000},
            {name: 'Awards', date: new Date('july 25, 2022'), amount: 1200},
        ]

        storeStub.get = (name) => {
            return (name == 'budgetPeriod') ?  { session: "22/23", semesters: ['fall', 'spring']} :
                name == 'extraIncome' ? extraIncome : null
        };

        let jun = otherSources.getTotalForMonth('jun', 2022);
        let june = otherSources.getTotalForMonth('june', 2022);
        let july = otherSources.getTotalForMonth('july', 2022);
        let aug = otherSources.getTotalForMonth('aug', 2022);
        let august = otherSources.getTotalForMonth('august', 2022);
        let dec = otherSources.getTotalForMonth('dec', 2022);

        expect(jun).to.equal(1040);
        expect(june).to.equal(1040);
        expect(july).to.equal(4200);
        expect(aug).to.equal(2310);
        expect(august).to.equal(2310);
        expect(dec).to.equal(1100);
    });
});
