import studentEmployment from '../../income/studentEmployment.js';

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
                let total = studentEmployment(month, sessionHourlyWage, sessionHoursPerWeek, incomeTax);
                expect(total).to.equal(expectedTotal);
            });
        });
    });

    it('Return total earnings for a period (start_date, end_date)', function() {
        let periods = [{
            start: new Date('august 21, 2022'),
            end: new Date('aug 27, 2022'),
            expectedTotal: 336.00 // 1 week during break - income_tax
        }, {
            start: new Date('sep 4, 2022'),
            end: new Date('oct 1, 2022'),
            expectedTotal: 672.00 // 4 weeks in session - income_tax
        }]

        periods.forEach(({start, end, expectedTotal}) => {
            let total = studentEmployment({start, end}, sessionHourlyWage, sessionHoursPerWeek, incomeTax);
            expect(total).to.equal(expectedTotal);
        });
    });
});
