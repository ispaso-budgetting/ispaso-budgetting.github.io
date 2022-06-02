export default function(birthdate) {
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
