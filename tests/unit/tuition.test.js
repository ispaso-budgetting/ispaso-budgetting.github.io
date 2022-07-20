import tuition from '/expenditure/tuition.js';
import storeStub from '../stubs/store.js';

describe('Tuition:', function() {
    it('Should return total tuition: half sem', function() {
        window.today = () => new Date('jan 31 2023');
        storeStub.get = (budgetPeriod) => ({ session: "22/23", semesters: ['fall', 'spring']});

        expect(tuition.getTotal()).to.equal(62400);
    });

    it('Full session')
});

