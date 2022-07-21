import { getPaymentPlan } from '/budget/prinbill.js';
import storeStub from '../stubs/store.js';

describe('Prinbill payment plan', function() {
    it('GetPaymentPlan: return payment plan', function() {
        window.today = () => new Date('jan 2022');

        const pp = getPaymentPlan();

        expect(pp).to.have.lengthOf(18);
        pp.forEach(item => {
            expect(item).to.have.property('month').that.is.a('string');
            expect(item).to.have.property('amount').that.is.a('number');
            expect(item.amount).to.not.equal(0, item.month + ' has payment of 0');
        });
    });
    it('GetPaymentPlan (Stubbed): return payment plan', function() {
        window.today = () => new Date('jan 2022');

        storeStub.get = (name) => {
            return (name == 'budgetPeriod') ? { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'breakHousing') ? {'sb.22': 23, 'winter.22': 12} :
                (name == 'extraIncome') ?  [
                    {name: 'Family', date: new Date(), amount: 200},
                    {name: 'Stipends', date: new Date('jan 2023'), amount: 100},
                    {name: 'Awards', date: new Date('sept 2022'), amount: 500},
                ] :
                (name == 'holidayWork') ? {
                    'summer.22': { hoursPerWeek: 40 },
                    'summer.23': { hoursPerWeek: 35 },
                } :
                (name == 'finAid') ? 45000 :
                (name == 'sessionHourlyWage') ? 12 :
                (name == 'sessionHoursPerWeek') ? 15 :
                (name == 'incomeTax') ? 30 :
                null;
        }

        const pp = getPaymentPlan();

        expect(pp).to.have.lengthOf(18);
        pp.forEach(item => {
            expect(item).to.have.property('month').that.is.a('string');
            expect(item).to.have.property('amount').that.is.a('number');
            expect(item.amount).to.not.equal(0, item.month + ' has payment of 0');
        });
    });
});
