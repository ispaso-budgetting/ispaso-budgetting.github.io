import luxon from "../luxon.min.js";

function isInt(num) {
    return num % 1 == 0;
}

export function formatTime(durationVal, type, expectedFormat) {
    if(!expectedFormat)
        expectedFormat = type;

    let timeStr = '', newDurationVal;

    const dObj = {};

    switch(type) {
        case 'nights':
        case 'days':
            dObj.days = durationVal;
            break;
        default:
            dObj[type] = durationVal;
    }

    const duration = luxon.Duration.fromObject(dObj);

    if(expectedFormat == type) {
        timeStr += parseInt(durationVal) + ' ' + expectedFormat;

        if(!isInt(durationVal)) {
            const leftoverDuration = luxon.Duration.fromObject({[type]: durationVal % 1});

            switch(type) {
                case 'weeks':
                    const days = Math.round(leftoverDuration.as('days'));
                    timeStr += ' ' + parseInt(days) + ' days';
                    break;
            }
        }
    }

    return timeStr;
}
