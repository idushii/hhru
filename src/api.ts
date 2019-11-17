const base = `https://api.hh.ru`;

enum endpoints {
    areas = 'areas',
    vacancies = 'vacancies',
}

const defaultParams = {
    text: '',
    per_page: 100,
    page: 1,
};


function load(type: endpoints, params?: {}) {
    const url = getUrl(type, params);
    if (window.localStorage.getItem(url)) {
        return JSON.parse(window.localStorage.getItem(url) || '[]');
    }

    return fetch(url).then((r) => r.json()).then((r) => {
        window.localStorage.setItem(url, JSON.stringify(r));
        return r;
    });
}

function getUrl(type: endpoints, params?: {}): string {
    const url = new URL(`${base}/${type}`);
    if (params) {
        const keys = Object.keys(params);
        const values: string[] = Object.values(params);

        keys.forEach((key, index) => {
            url.searchParams.append(key, values[index]);

        });
    }
    return url.href;
}


export { base, endpoints, load, getUrl, defaultParams };
