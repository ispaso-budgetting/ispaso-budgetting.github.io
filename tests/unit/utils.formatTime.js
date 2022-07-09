import {formatTime} from '/utils/index.js';

describe('FormatTime: unit tests', function() {
    it('Turn x.xxxx weeks decimal value to X weeks, y days', function() {
        const weeks = 4 + (6/7);

        expect(formatTime(weeks, 'weeks')).to.equal('4 weeks 6 days');
    });

    it('If duration is int, and expected type == type, return duration', function() {
        expect(formatTime(1, 'weeks')).to.equal('1 weeks');
        expect(formatTime(2, 'weeks')).to.equal('2 weeks');
        expect(formatTime(4, 'weeks')).to.equal('4 weeks');
    });
});
