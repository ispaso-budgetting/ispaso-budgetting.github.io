import { faker } from '/tests/dependencies/faker-esm.js';
import store from '../../store/index.js';

describe('App store', function() {
    beforeEach(() => store._reset());

    it('Retrieve items from localStorage', function() {
        const incomeTax = 42, hourlyWage=13;
        const ls = window.localStorage;

        ls.setItem('sessionHoursPerWeek', 15);
        ls.setItem('incomeTax', incomeTax);
        ls.setItem('hourlyWage', hourlyWage);

        expect(store.get('sessionHoursPerWeek')).to.equal(15);
        expect(store.retrieve('hourlyWage')).to.equal(hourlyWage);
        expect(store.retrieve('incomeTax')).to.equal(incomeTax);
    });

    it('Can save and retrieve single values', function() {
        let values = {
            finAid: faker.datatype.number(),
            hourlyWage: faker.datatype.number(),
            ageBracket: 'a',
            birthdate: new Date()
        }

        for(const key in values) {
            const value = values[key];
            
            store.save(key, value);
            expect(store.retrieve(key)).to.equal(value);
        }
    });

    it('Can save whole object to store', function() {
        let values = {
            finAid: faker.datatype.number(),
            birthdate: new Date(),
            hourlyWage: faker.datatype.number(),
        }

        store.save(values);

        for(const key in values) {
            const value = values[key];
            if(typeof value =='object')
                expect(store.retrieve(key)).to.eql(value);
            else
                expect(store.retrieve(key)).to.equal(value);
        }
    });

    it('Return default value if value in store doesn\'t exist', function() {
        window.localStorage.clear();
        store._reset();

        expect(store.retrieve('hourlyWage')).to.equal(12);
        expect(store.retrieve('sessionHoursPerWeek')).to.equal(20);
        expect(store.retrieve('incomeTax')).to.equal(30);
    });
});
