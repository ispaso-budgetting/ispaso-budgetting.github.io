import bModule from '/expenditure/breakHousing.js';
import store from '../stubs/store.js';
import budgettingPeriod from '../stubs/budgettingPeriod.js';

describe('Break housing: Unit tests', function() {
    beforeEach(() => {
    });

    it('bModule.getAllBreakHousing: returns max number of nights for each holiday if not set', function() {
        store.get = (budgetPeriod) => ({ session: "22/23", semesters: ['fall', 'spring']});

        const res = bModule.getAllBreakHousing();

        expect(res).to.have.keys('summer.22', 'winter.22', 'sb.23', 'summer.23');

        expect(res['winter.22']).to.have.property('maxNights', 35);
        expect(res['winter.22']).to.have.property('nights', 35);
        expect(res['sb.23']).to.have.property('maxNights', 7);
        expect(res['sb.23']).to.have.property('nights', 7);
    });

    it('bModule.getAllBreakHousing: also return cost of staying in break housing', function() {
        store.get = (name) => {
            return (name == 'budgetPeriod') ? { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'breakHousing') ? { 'summer.22':85, 'winter.22':21,  } : null
        }

        const res = bModule.getAllBreakHousing();

        expect(res).to.have.keys('summer.22', 'winter.22', 'sb.23', 'summer.23');

        expect(res['winter.22']).to.have.property('budgetAmount', - (7 * 21));
        expect(res['summer.22']).to.have.property('budgetAmount', - (7*85));
        expect(res['sb.23']).to.have.property('budgetAmount', - (49));
        expect(res['summer.23']).to.have.property('budgetAmount', - 735);
    });

    it('getCostForAll: return total cost on break housing for entirebudget period', function() {
        store.get = (name) => {
            return (name == 'budgetPeriod') ? { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'breakHousing') ? { 'summer.22':85, 'winter.22':21,  } : null
        }

        const res = bModule.getCostForAll();

        expect(res).to.equal(
            -(7*21) - (7*85) - 49 - 735
        );
    });

    it('bModule.getAllBreakHousing: returns number of nights saved for each holiday', function() {
        store.get = (name) => {
            return (name == 'budgetPeriod') ? { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'breakHousing') ? { 'summer.22':85, 'winter.22':21,  } : null
        }

        const res = bModule.getAllBreakHousing();

        expect(res).to.have.keys('summer.22', 'winter.22', 'sb.23', 'summer.23');

        expect(res['winter.22']).to.have.property('nights', 21);
        expect(res['summer.22']).to.have.property('nights', 85);
    });

    it('bModule.getForMonth: returns max number of nights for each holiday if not set', function() {
        store.get = (budgetPeriod) => ({ session: "22/23", semesters: ['fall', 'spring']});

        const res = bModule.getForMonth('december', '2022');

        expect(res).to.have.property('nights', 14);
    });

    it('bModule.getForMonth: if breakhousing set in store, return num nights set', function() {
        store.get = (name) => {
            return (name == 'budgetPeriod') ?  { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'breakHousing') ? { 'winter.22': 8 } : null
        }

        const res = bModule.getForMonth('december', '2022');

        expect(res).to.have.property('nights', 8);
    });

    it('bModule.getForMonth: return cost of stay', function() {
        store.get = (name) => {
            return (name == 'budgetPeriod') ?  { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'breakHousing') ? { 'winter.22': 8 } : null
        }

        expect( bModule.getForMonth('december', '2022') ).to.have.property('budgetAmount', (8 * -7));
    });


    it('Sets break housing', function() {
        const spy = sinon.fake.resolves(true);
        store.save = spy;
        const val = {
            'winter.22': {nights:5}, //5 nights
            'summer.22': {nights:100}
        };

        const res = bModule.setBreakHousing(val);

        sinon.assert.calledWith(spy, 'breakHousing', {
            'winter.22': 5,
            'summer.22': 100.
        });
    });
});

