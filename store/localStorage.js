export function save(key, rawData) {
    let data = rawData;

    if(data == null)
        return null;

    if(data instanceof Date)
        data = { value: rawData.getTime(), type_: 'date'};

    if (typeof data == 'object')
        data = JSON.stringify(data);

    window.localStorage.setItem(key, data);
}

export function retrieve(key) {
    const rawData = window.localStorage.getItem(key);
    // console.log('key:', key);
    let data = rawData;
    // console.log('data:', data);

    try {
        data = JSON.parse(data);
    } catch(e) {
        return data
    }
    if(data && data.type_ == 'date' && data.value)
        data = new Date(data.value);
    return data;
}

export function reset(key, value=null) {
    let data = value;

    if (value && typeof value == 'object') {
        data = JSON.stringify(value);
    }

    if(data)
        window.localStorage.setItem(key, data);
    else
        window.localStorage.removeItem(key);
}
