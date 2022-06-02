const now = new Date();
const currentYear = now.getFullYear()

export default [{
    id: 'spring.22', name: 'Spring 2022', start: 'Dec 2, 2021', end: 'Aug 1, 2022', excludes: ['fall.22', 'spring.23']
}, {
    id: 'fall.22', name: 'Fall 2022', start: 'Aug 2, 2022', end: 'Dec 1 2022', excludes: 'spring.22'
}, {
    id: 'spring.23', name: 'Spring 2023', start: 'Dec 2, 2022', end: 'Aug 1, 2023', excludes: 'spring.22'
}];
