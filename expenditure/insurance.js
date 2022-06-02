function calcAgeBracket(birthdate) {
    if(!birthdate)
        throw new Error('No age information provided');

    const today = new Date();
    let ageBracket;

    const ageInSeconds = (today - new Date(birthdate))/1000;
    const age = ageInSeconds / (3600 * 24 * 365);

    if(age < 25)
        return 'a'
    else if(age  < 30)
        return 'b'
    else if(age <= 64)
        return 'c';
    else return null
}

export default function(birthdate, ageBracket, months) {
    // if(['a', 'b', 'c'].includes(birthdate))
        // ageBracket = birthdate;
    if(!ageBracket)
        ageBracket = calcAgeBracket(birthdate);

    let monthlyPremium = (ageBracket == 'a') ? 62
    : (ageBracket == 'b') ? 120 : 
        (ageBracket == 'c') ? 248 : null;

    return monthlyPremium * months;
}
