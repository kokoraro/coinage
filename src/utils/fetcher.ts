async function fetcher<T>(method: string, url: string, path: string, data?: T) {
    const reponse = await fetch(`${url}/${path}`, {
        method,
        headers: {
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });
    return reponse.json();
}

export default fetcher;
