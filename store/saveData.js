export default function(key, rawData) {
    console.log('saving', key, 'to localStorage', rawData);
    let data = rawData;

    if(data == null)
        return null;

    if (typeof data == 'object')
        data = JSON.stringify(rawData);

    window.localStorage.setItem(key, data);
}
