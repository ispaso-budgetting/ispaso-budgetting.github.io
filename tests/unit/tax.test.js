import tax from '/expenditure/tax.js';
import storeStub from '../stubs/store.js';
import tuitionStub from '../stubs/expenditure/tuition.js';
import miscPrinStub from '../stubs/expenditure/miscPrin.js';
import finAidStub from '../stubs/income/finAid.js';

describe('Tax', function() {
    it('Should return total tax', function() {
        window.today = () => new Date('jan 31 2023');
        storeStub.get = (name) => {
            name == 'budgetPeriod' ?  { session: "22/23", semesters: ['fall', 'spring']} :
                name == 'finAid' ? 45000 : null;
        }

        finAidStub.getTotal = () => 45000;
        tuitionStub.getTotal = () => 30000;
        miscPrinStub.getTotal = () => 5000;

        expect(tax.getTotal()).to.equal(1400);
    });

    it('Full session')
});



