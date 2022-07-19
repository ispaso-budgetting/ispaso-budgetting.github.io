export const semesters = {
    'fall.21': { name: 'Fall 2021', start: 'Aug 29, 2021', end: 'Dec 18 2021'},
    'spring.22': { name: 'Spring 2022', start: 'Jan 20, 2022', end: 'May 15, 2022'},
    'fall.22': { name: 'Fall 2022', start: 'Aug 29, 2022', end: 'Dec 18 2022'},
    'spring.23': { name: 'Spring 2023', start: 'Jan 20, 2023', end: 'May 15, 2023'},
    'fall.23': { name: 'Fall 2023', start: 'Aug 29, 2023', end: 'Dec 18 2023'},
    'spring.24': { name: 'Spring 2024', start: 'Jan 20, 2024', end: 'Aug 29, 2024'},
};

export const budgetPeriods = {
    'fall.21': { name: 'Fall 2021', start: 'Aug 1, 2021', end: 'Dec 31 2021'},
    'spring.22': { name: 'Spring 2022', start: 'Jan 1, 2022', end: 'July 31, 2022'},
    'fall.22': { name: 'Fall 2022', start: 'Aug 1, 2022', end: 'Dec 31 2022'},
    'spring.23': { name: 'Spring 2023', start: 'Jan 1, 2023', end: 'July 30, 2023'},
    'fall.23': { name: 'Fall 2023', start: 'Aug 1, 2023', end: 'Dec 31 2023'},
    'spring.24': { name: 'Spring 2024', start: 'Jan 1, 2024', end: 'Aug 1, 2024'},
    'fall.24': { name: 'Fall 2024', start: 'Aug 1, 2024', end: 'Dec 31 2024'},
    'spring.25': { name: 'Spring 2025', start: 'Jan 1, 2025', end: 'Aug 1, 2025'},
};

export const sessions = {
    '21/22': {
        // name: '2021-2022',
        'fall': budgetPeriods['fall.21'],
        'spring': budgetPeriods['spring.22']
    },
    '22/23': {
        // name: '2022-2023',
        'fall': budgetPeriods['fall.22'],
        'spring': budgetPeriods['spring.23']
    },
    '23/24': {
        // name: '2023-2024',
        'fall': budgetPeriods['fall.23'],
        'spring': budgetPeriods['spring.24']
    },
};

