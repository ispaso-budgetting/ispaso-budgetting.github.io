export function total(startDate, gradDate) {
    const yearlyTuition = 31200;

    if(!startDate)
        startDate = new Date();
    console.log('gradDAte', gradDate, 'startDate', startDate);

    // const gradDate = new Date(gradDate_.month + ' ' + gradDate_.year);

    let sessions = gradDate.year - startDate.year;

    if(startDate < gradDate)
        sessions += 0.5;
    else if(startDate > gradDate)
        sessions -= 0.5;
    console.log('sessions:', sessions);

    // let sessions = (new Date(gradDate - startDate))/(1000 * 3600 * 24 * 365.25);

    return sessions * yearlyTuition;
}
