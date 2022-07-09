import store from '../../store/index.js';

describe('App store: Break Housing', function() {
    beforeEach(() => {
        window.today = () => new Date('jan 20, 2022');

        store.set('academicSession', '22/23');
        store.set('semesters', ['spring']);
    });

    it('When saving holiday work, save even for holidays that are not part of session');

    it('Set and retrieve nights in break housing', function() {
        store.set('breakHousing', {'winter.22': {nights: 14}}); // nights for winter.22
        const breakHousing = store.get('breakHousing');

        expect(breakHousing).to.have.property('winter.22').that.has.property('nights', 14);
    });

    it('Set nights in break housing as percent', function() {
        store.set('breakHousing', {'winter.22': {nights: '100%'}}); // nights for winter.22
        expect( store.get('breakHousing') ).to.have.property('winter.22').that.has.property('nights', 32);

        store.set('breakHousing', {'winter.22': {nights: '78.125%'}}); // nights for winter.22
        expect( store.get('breakHousing') ).to.have.property('winter.22').that.has.property('nights', 25);

        store.set('breakHousing', {'winter.22': {nights: '50%'}}); // nights for winter.22
        expect( store.get('breakHousing') ).to.have.property('winter.22').that.has.property('nights', 16);
    });

    it('Set nights - if percent exceeds 100%, set to maxNights', function() {
        store.set('breakHousing', {'winter.22': {nights: '105%'}});
        const breakHousing = store.get('breakHousing');

        expect( store.get('breakHousing') ).to.have.property('winter.22').that.has.property('nights', 32);
    });

    it('Set nights(num) - if num exceeds maxWeeks, set to maxNights', function() {
        store.set('breakHousing', {'winter.22':{nights:34}});
        const breakHousing = store.get('breakHousing');

        expect(breakHousing).to.have.property('winter.22').that.has.property('nights', 32);
    });
});
