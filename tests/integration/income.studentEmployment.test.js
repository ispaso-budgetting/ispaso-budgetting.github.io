import studentEmployment from '/income/studentEmployment.js';

describe('Income: Student Employment', function() {
    let sessionHourlyWage = 12;
    let sessionHoursPerWeek = 20;
    let incomeTax = 30;

    it('Return earnings for a month', function() {

        let cases = [{
            monthVar: ['oct', 'october'], // 31 days in session
            expectedTotal: 744.00
        }, {
            monthVar: ['sept', 'sep', 'september'], // 30 days in session
            expectedTotal: 720.00
        }, {
            monthVar: ['june', 'jun'], // 30 days in break
            expectedTotal: 1440.00
        }, {
            monthVar: ['jul', 'july'], // 31 days working 40 hour weeks
            expectedTotal: 1488.00
        }]

        cases.forEach(({monthVar, expectedTotal}) => {
            monthVar.forEach(month => {
                let total = studentEmployment.getTotalForMonth(month, sessionHourlyWage, sessionHoursPerWeek, incomeTax);
                expect(total).to.equal(expectedTotal);
            });
        });
    });

    it('Return total earnings for entire budgetting period', function() {
        window.today =() => new Date('jul 24, 2022');

        let total = studentEmployment.getTotal(sessionHourlyWage, sessionHoursPerWeek, incomeTax);
        expect(total).to.equal(488);
    });
});
