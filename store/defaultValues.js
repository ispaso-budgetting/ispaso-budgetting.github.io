export default function() {
    return {
        ageBracket: null,
        birthdate: null,

        sessionHoursPerWeek: 20,
        hourlyWage: 12,
        incomeTax: 30,

        holidays: [],

        holidayWork: {},

        extraIncome: [
            {name: 'Family', date: new Date(), amount: 2000},
            {name: 'Stipends', date: new Date(), amount: 100},
            {name: 'Awards', date: new Date(), amount: null},
        ],

        extraExpenditure: [
            {name: 'Feeding', date: new Date(), amount: 2000},
            {name: 'Transportation', date: new Date(), amount: null},
            {name: 'Outings', date: new Date(), amount: null},
        ],

        budgetPeriod: 'spring.22',
        budgetPeriodNew: ['spring.22'],
        finAid: null,
        gradDate: {month: null, year: null},
    }
}
