export default function(data, month) {
    let total = 0;

    if(typeof month=='string') {
        month = new Date(month + ' 5');
        month = month.getMonth();
    }

    data.forEach(d => {
        if(month) {
            if(typeof month =='number') {
                if(month == d.date.getMonth())
                    total += d.amount;
            }
        } else
            total += d.amount;
    });

    return total;
}
