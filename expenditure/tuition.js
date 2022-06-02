export default function(semesters) {
    const yearlyTuition = 31200;

    /*
    let sessions = gradDate.year - startDate.year;

    if(startDate < gradDate)
        sessions += 0.5;
    else if(startDate > gradDate)
        sessions -= 0.5;
    console.log('sessions:', sessions);

    // let sessions = (new Date(gradDate - startDate))/(1000 * 3600 * 24 * 365.25);
    */

    return (semesters/2) * yearlyTuition;
}
