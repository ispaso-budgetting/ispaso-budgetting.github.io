import bModule from '/expenditure/breakHousing.js';
import budgettingPeriod from '../stubs/budgettingPeriod.js';

describe('Break housing: Integration tests', function() {
    it('bModule.getAllBreakHousing: returns max number of nights for each holiday if not set', function() {
        window.today = () => new Date('jul 22, 2022');
        const res = bModule.getAllBreakHousing();

        expect(res).to.have.keys('summer.22', 'winter.22', 'sb.23', 'summer.23');

        expect(res['winter.22']).to.have.property('maxNights', 35);
        expect(res['winter.22']).to.have.property('nights', 35);
        expect(res['sb.23']).to.have.property('maxNights', 7);
        expect(res['sb.23']).to.have.property('nights', 7);
    });

    it('Sets break housing', function() {
        const val = {
            'winter.22': {nights:5}, //5 nights
            'summer.22': {nights:100}
        };

        const res = bModule.setBreakHousing(val);

        expect(bModule.getAllBreakHousing()).to.include.keys('winter.22', 'summer.22');
    });
});

