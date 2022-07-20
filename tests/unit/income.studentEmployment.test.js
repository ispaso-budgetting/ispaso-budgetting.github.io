import studentEmployment from '../../income/studentEmployment.js';
import store from '../stubs/store.js';

describe('Income: Student Employment', function() {
    let sessionHourlyWage = 12;
    let sessionHoursPerWeek = 20;
    let incomeTax = 30;

    it('Return earnings for a month', function() {
        store.get = (name) => {
            return (name == 'budgetPeriod') ? { session: "22/23", semesters: ['fall', 'spring']} :
                (name == 'sessionHourlyWage') ? 15:
                (name == 'sessionHoursPerWeek') ? 15:
                (name == 'incomeTax') ? 30:
                (name == 'holidayWork') ? {'summer.22': {hours:40, weeks:85, wage:12}}:
                null
        }

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
        store.get = (name) => {
            return (name == 'budgetPeriod') ? { session: "21/22", semesters: ['fall', 'spring']} :
                (name == 'sessionHourlyWage') ? 15:
                (name == 'sessionHoursPerWeek') ? 15:
                (name == 'incomeTax') ? 30:
                (name == 'holidayWork') ? {'summer.22': {hoursPerWeek:40, weeks:85, wage:12}}:
                null
        }

        let total = studentEmployment.getTotal(sessionHourlyWage, sessionHoursPerWeek, incomeTax);
        expect(total).to.equal(488);
    });
});
