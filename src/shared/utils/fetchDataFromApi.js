import fetch from 'isomorphic-fetch';

function fetchData (url, params = {}) {
    console.log("I have been called");
    return fetch(url)
        .then(res => res.json())
        .catch(err => err)
}

export default fetchData;