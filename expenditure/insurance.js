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

export function monthly(birthdate) {
    console.log('birthdate:', birthdate);
    let ageBracket
    if(['a', 'b', 'c'].includes(birthdate))
        ageBracket = birthdate;
    else ageBracket = calcAgeBracket(birthdate);

    console.log('ageBracket:', ageBracket);
        
    if(ageBracket == 'a')
        return 62;
    else if(ageBracket == 'b')
        return 120;
    else if(ageBracket == 'c')
        return 248;
    else return null;
}

export function yearly(ageBracket) {
    return monthly(ageBracket) * 12;
}
