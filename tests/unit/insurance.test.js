import insurance from '/expenditure/insurance.js';
import storeStub from '../stubs/store.js';

describe('Insurance',function() {
    it('Calculate insurance for 6 months', function() {
        window.today = () => new Date('jan 31 2023');
        storeStub.get = (budgetPeriod) => ({ session: "22/23", semesters: ['fall', 'spring']});

        expect(insurance.getTotal()).to.equal(62 * 6);
    });
});
