export default function(key, value=null) {
    let data = value;

    if (value && typeof value == 'object') {
        data = JSON.stringify(value);
    }

    if(data)
        window.localStorage.setItem(key, data);
    else
        window.localStorage.removeItem(key);
}
