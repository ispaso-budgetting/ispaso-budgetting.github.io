import { getPaymentPlan } from '/budget/prinbill.js';
import storeStub from '../stubs/store.js';
import stubs from '../stubs/index.js';
import insuranceStub from '../stubs/expenditure/insurance.js';
import tuitionStub from '../stubs/expenditure/tuition.js';
import miscPrinStub from '../stubs/expenditure/miscPrin.js';
import breakHousingStub from '../stubs/expenditure/breakHousing.js';

import sEStub from '../stubs/income/studentEmployment.js';
import extraIncomeStub from '../stubs/income/extraIncome.js';
import finAidStub from '../stubs/income/finAid.js';


describe('Prinbill payment plan', function() {
    it('GetPaymentPlan: should return return payment plan', function() {
        const prinbillAmount = 3600;
        storeStub.get = (budgetPeriod) => ({ session: "21/22", semesters: ['fall', 'spring']});

        window.today = () => new Date('jan 2022');

        tuitionStub.getTotal = () => 36000;
        breakHousingStub.getTotal = () => 2870;
        insuranceStub.getTotal = () => 1600;
        miscPrinStub.getTotal = () => 930;

        finAidStub.getTotal = () => 45000;

        let mIncome = {
            jan: 1000,
            feb: 880,
            mar: 700,
            apr: 800,
            may: 920,
            june: 1700,
            jul: 2300,
            jul: 2300,
        }

        let i = 0;

        function getTotalForMonth(name) {
            let _t;
            for(let key in mIncome) {
                const regex = new RegExp('^' + key, 'i');
                if(regex.test(name))
                    _t = mIncome[key];
            }

            return _t/2;
        }

        sEStub.getTotalForMonth = getTotalForMonth;
        finAidStub.getTotalForMonth =  getTotalForMonth;
        extraIncomeStub.getTotalForMonth =  getTotalForMonth;

        // stubs.insurance.total = () => 1000;

        expect(getPaymentPlan()).to.have.deep.members([
            {month: 'January 2022', amount: 600},
            {month: 'February 2022', amount: 528},
            {month: 'March 2022', amount: 420},
            {month: 'April 2022', amount: 480},
            {month: 'May 2022', amount: 552},
            {month: 'June 2022', amount: 1020},
        ]);

        // For march till june.
        window.today = () => new Date('march 2022');

        i = 0;

        sEStub.getTotalForMonth = getTotalForMonth;
        extraIncomeStub.getTotalForMonth =  getTotalForMonth;

        expect(getPaymentPlan()).to.have.lengthOf(4);

        expect(getPaymentPlan()).to.have.deep.members([
            {month: 'March 2022', amount: 611.65},
            {month: 'April 2022', amount: 699.03},
            {month: 'May 2022', amount: 803.88},
            {month: 'June 2022', amount: 1485.44},
        ]);
    });

    it('Calls methods with correct year', function() {
        storeStub.get = (budgetPeriod) => ({ session: "21/22", semesters: ['fall', 'spring']});

        window.today = () => new Date('jan 2022');
        function createSpies() {
            return [
                sinon.fake.returns(23),
                sinon.fake.returns(26),
            ];
        }

        let spies = createSpies();

        sEStub.getTotalForMonth = spies[0];
        extraIncomeStub.getTotalForMonth =  spies[1];

        getPaymentPlan();

        spies.forEach(spy => {
            sinon.assert.calledWith(spy, 'January', 2022);
            sinon.assert.calledWith(spy, 'February', 2022);
            sinon.assert.calledWith(spy, 'March', 2022);
            sinon.assert.calledWith(spy, 'April', 2022);
            sinon.assert.calledWith(spy, 'May', 2022);
            sinon.assert.calledWith(spy, 'June', 2022);
        });

        // For march till june.
        window.today = () => new Date('october 2021');

        spies = createSpies();

        sEStub.getTotalForMonth = spies[0];
        extraIncomeStub.getTotalForMonth =  spies[1];

        getPaymentPlan();

        spies.forEach(spy => {
            sinon.assert.calledWith(spy, 'October', 2021);
            sinon.assert.calledWith(spy, 'November', 2021);
            sinon.assert.calledWith(spy, 'December', 2021);
            sinon.assert.calledWith(spy, 'January', 2022);
            sinon.assert.calledWith(spy, 'February', 2022);
            sinon.assert.calledWith(spy, 'March', 2022);
            sinon.assert.calledWith(spy, 'April', 2022);
            sinon.assert.calledWith(spy, 'May', 2022);
            sinon.assert.calledWith(spy, 'June', 2022);
        });
    });
});
