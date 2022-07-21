import * as budgetPeriod from '/budget/budgetPeriod.js';

describe('BudgetPeriod', function() {
    it('Get default budget period', function() {
        expect(budgetPeriod.getBudgetPeriod()).to.deep.eql({
            session: '22/23', semesters:['fall', 'spring']});
    });

    it('Set and get budget period', function() {
        console.log('\n\nTest');
        budgetPeriod.getBudgetPeriod()
        budgetPeriod.setBudgetPeriod({semesters: ['spring', 'fall'], session: '14/15'});

        budgetPeriod.getBudgetPeriod()
        console.log("End Test\n\n");
        expect(budgetPeriod.getBudgetPeriod()).to.deep.eql({
            session: '14/15', semesters:['spring', 'fall']});
    });

    it('Set budget period and endDate for budget period', function() {
        const jul31 = new Date('july 31, 2024 utc 23:00');

        budgetPeriod.setBudgetPeriod({semesters: ['spring', 'fall'], session: '23/24'});
        expect(budgetPeriod.getEndDate()).to.eql(jul31);

        budgetPeriod.setBudgetPeriod({semesters: ['spring'], session: '23/24'});
        expect(budgetPeriod.getEndDate()).to.eql(jul31);

        budgetPeriod.setBudgetPeriod({semesters: ['fall'], session: '23/24'});
        expect(budgetPeriod.getEndDate()).to.eql(new Date('dec 30, 2023 utc 23:00'));
    });
});
