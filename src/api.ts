let base = `https://api.hh.ru`

enum endpoints {
    areas = "areas",
    vacancies = "vacancies",
}

let defaultParams = {
    text: '',
    per_page: 100,
    page: 1
}


function load(type: endpoints, params?: {}) {
    let url = getUrl(type, params)
    if (window.localStorage.getItem(url)) {
        return JSON.parse(window.localStorage.getItem(url))
    }

    return fetch(url).then(r => r.json()).then(r => {
        window.localStorage.setItem(url, JSON.stringify(r))
        return r;
    })
}

function getUrl(type: endpoints, params?: {}) {
    var url = new URL(`${base}/${type}`)
    if (params)
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    return url.href
}


export { base, endpoints, load, getUrl, defaultParams }