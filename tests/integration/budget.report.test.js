import { total, monthly } from '../../budget/calculate.js';

describe.only('Budget report', function() {
    it('Calculate monthly budget', function() {
        const result = monthly();

        expect(res).to.have.keys('income', 'expenditure');
    });
});
