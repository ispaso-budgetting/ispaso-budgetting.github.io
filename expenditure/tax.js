export let internationalTax

export default function(totalAid, tuitionPlusFees) {
    internationalTax = (totalAid - tuitionPlusFees) * 0.14;

    return internationalTax;
}
