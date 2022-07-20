import * as budgetPeriod from '/budget/budgetPeriod.js';

describe('BudgetPeriod', function() {
    it('Set budget period', function() {
        budgetPeriod.setBudgetPeriod({semesters: ['spring', 'fall'], session: '14/15'});

        expect(budgetPeriod.getSemesters()).to.have.members(['spring', 'fall']);
        expect(budgetPeriod.getSession()).to.equal('14/15');
    });
});
