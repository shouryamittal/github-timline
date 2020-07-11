import fetch from 'isomorphic-fetch';

function fetchData (url, params = {}) {
    return fetch(url)
        .then(res => res.json())
        .catch(err => err)
}

export default fetchData;