export let internationalTax
import store from 'store';
import tuition from 'expenditure/tuition.js';
import finAid from 'income/finAid.js';
import miscPrin from 'expenditure/miscPrin.js';

function getTotal() {
    const tuitionAmt = tuition.getTotal(),
        miscPrinAmt = miscPrin.getTotal();

    const totalAid = finAid.getTotal(), miscFees=0;

    internationalTax = (totalAid - tuitionAmt - miscPrin.getTotal()) * 0.14;

    return parseFloat(internationalTax.toFixed(2));
}

export default {
    getTotal
}
