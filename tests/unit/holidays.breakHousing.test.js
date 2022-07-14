import {breakHousing} from '/utils/holidays.js';

describe('Break housing: Unit tests', function() {
    it('Calculate number of nights for each holiday', function() {
        const start = new Date('aug 29 2022');
        const end = new Date('may 15 2024');

        const res = breakHousing(start, end);

        // expect(res).to.have.keys('winter.22', 'sb.23');

        expect(res['winter.22']).to.have.property('maxNights', 35);
        expect(res['sb.23']).to.have.property('maxNights', 7);
    });
});

