import { faker } from '/tests/dependencies/faker-esm.js';
import { save, retrieve} from '../../store/localStorage.js';

describe('LocalStorage test', function() {
    it('Store and retrieve dates', function() {
        const date = new Date('jun 12, 1983');

        save('date', date);

        expect(retrieve('date')).to.eql(date);
    });

    it('Store and retrieve numbers', function() {
        const numVal = faker.datatype.number();

        save('numVal', numVal);

        expect(retrieve('numVal')).to.equal(numVal);
    });

    it('Store and retrieve strings', function() {
        const stringVal = faker.lorem.words();

        save('stringVal', stringVal);

        expect(retrieve('stringVal')).to.equal(stringVal);
    });
});
