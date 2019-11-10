let base = `https://api.hh.ru`

enum endpoints {
    areas = "areas",
    vacancies = "vacancies",
}

function  load(type: endpoints, params?: {}){
    var url = new URL(`${base}/${type}`)
    if (params)
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    if (window.localStorage.getItem(url.href)) {
        return JSON.parse(window.localStorage.getItem(url.href))
    }

    return fetch(url.href).then(r => r.json()).then(r => {
        window.localStorage.setItem(url.href, JSON.stringify(r))
        return r;
    })
}

export { base, endpoints, load }