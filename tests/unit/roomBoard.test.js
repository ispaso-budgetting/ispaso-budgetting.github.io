import roomBoard from '/expenditure/roomBoard.js';
import storeStub from '../stubs/store.js';

describe('Room and board:', function() {
    it('Should return total r&b', function() {
        window.today = () => new Date('jan 31 2023');
        storeStub.get = (budgetPeriod) => ({ session: "22/23", semesters: ['fall', 'spring']});

        expect(roomBoard.getTotal()).to.equal(12870);
    });

    it('Full session')
});


