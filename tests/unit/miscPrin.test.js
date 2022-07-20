import miscPrin from '/expenditure/miscPrin.js';
import storeStub from '../stubs/store.js';

describe('Misc Prin charges', function() {
    it('Should return total miscPrin', function() {
        window.today = () => new Date('jan 31 2023');
        storeStub.get = (name) => {
            name == 'budgetPeriod' ?  { session: "22/23", semesters: ['fall', 'spring']} :
                name == 'finAid' ? 45000 : null;
        }

        expect(miscPrin.getTotal()).to.equal(930);
    });

    it('Full session')
});




