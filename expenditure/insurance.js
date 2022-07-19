import store from '../store/index.js';

export default function(birthdate, ageBracket, months) {
    let monthlyPremium = 62;

    return monthlyPremium * months;
}
