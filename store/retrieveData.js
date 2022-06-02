export default function(key) {
    const rawData = window.localStorage.getItem(key);
    console.log('key:', key);
    console.log('window.localStorage', window.localStorage);
    let data = rawData;
    console.log('data:', data);

    if(rawData && rawData[0] == '{' && rawData[rawData.length - 1] == '}')
        data = JSON.parse(rawData);

    return data;
}

