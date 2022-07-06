/**
 * params
 *  - data = store.extraIncome
 */
export default function(data, period) {
    // console.log('PERIOD:', period);
    let months = [], start, end;
    let total = 0;

    if(typeof period=='string' && /^\w+$/.test(period)) {
        // console.log('IS MONTH:', period);
        let month_ = new Date(period + ' 5');
        months.push(month_.getMonth());
    } else if(typeof period=='object' && period.start && period.end) {
        // console.log('IS PERIOD:', period);
        ({start, end} = period);

        if(!(start instanceof Date))
            start = new Date(start);
        if(!(end instanceof Date))
            end = new Date(end);
    }
    // else if(typeof period == 'object' && period.start && period.end) {

    data.forEach(d => {
        if(months.length > 0) {
            months.forEach(month => {
                if(typeof month =='number') {
                    if(month == d.date.getMonth())
                        total += d.amount;
                }
            });
        } else if(start && end) {
            if(start <= d.date && d.date <= end)
                total += d.amount;
        }
        else if(!period)
            total += d.amount;
    });

    return total;
}
