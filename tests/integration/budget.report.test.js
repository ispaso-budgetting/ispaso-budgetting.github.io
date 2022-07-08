import { total, monthly } from '../../budget/calculate.js';

describe('Budget report', function() {
    it('monthly(): within the same year', function() {
        const start = new Date('aug 29, 2022');
        const end = new Date('dec 15, 2022');

        const res = monthly(start, end);

        expect(res.map(a => a.name)).to.have.members([
            'August 2022', 'September 2022', 'October 2022', 'November 2022',
            'December 2022' ]);
    });
    it('monthly(): to same month next year', function() {
        const start = new Date('aug 29, 2022');
        const end = new Date('aug 15, 2023');

        const res = monthly(start, end);

        expect(res.map(a => a.name)).to.have.members([
            'August 2022', 'September 2022', 'October 2022', 'November 2022',
            'December 2022', 'January 2023', 'February 2023', 'March 2023',
            'April 2023', 'May 2023', 'June 2023', 'July 2023', 'August 2023'
        ]);
    });
    it('monthly(): to later month next year', function() {
        const start = new Date('aug 29, 2022');
        const end = new Date('oct 15, 2023');

        const res = monthly(start, end);

        expect(res.map(a => a.name)).to.have.members([
            'August 2022', 'September 2022', 'October 2022', 'November 2022',
            'December 2022', 'January 2023', 'February 2023', 'March 2023',
            'April 2023', 'May 2023', 'June 2023', 'July 2023', 'August 2023',
            'September 2023', 'October 2023'
        ]);
    });
    it('monthly(): to earlier month next year', function() {
        const start = new Date('aug 29, 2022');
        const end = new Date('may 15, 2023');

        const res = monthly(start, end);

        expect(res.map(a => a.name)).to.have.members([
            'August 2022', 'September 2022', 'October 2022', 'November 2022',
            'December 2022', 'January 2023', 'February 2023', 'March 2023',
            'April 2023', 'May 2023'
        ]);
    });

    it('monthly(): income for each month should be itemized', function() {
        const start = new Date('aug 29, 2022');
        const end = new Date('may 15, 2023');

        const res = monthly(start, end);

        expect(res).to.be.an('array').that.is.not.empty
    });

    it('monthly(): report income total for each month', function() {
        const start = new Date('aug 29, 2022');
        const end = new Date('may 15, 2023');

        const res = monthly(start, end);

        expect(res).to.be.an('array').that.is.not.empty
    });
});
