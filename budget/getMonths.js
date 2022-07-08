/**
 * Get months between two dates
 */

const monthNames = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

export default function(start ,end) {
    const months = [];

    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const startMonth =  start.getMonth();
    const endMonth = end.getMonth();

    let i = startYear, j = startMonth;
    let iDate = new Date(startYear, startMonth, 1);

    while(iDate <= end) {
        const monthIndex = iDate.getMonth();

        months.push(monthNames[monthIndex] + ' ' + iDate.getFullYear())

        const newMonthIndex = monthIndex + 1;

        iDate = new Date(iDate.setMonth(newMonthIndex));
    }

    return months;
}
