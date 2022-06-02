export default function(key, rawData) {
    console.log('saving', key, 'to localStorage');
    let data = rawData;

    if(data == null)
        return null;

    if (typeof data == 'object')
        data = JSON.stringify(rawData);
    console.log('data:', data);

    window.localStorage.setItem(key, data);
}
