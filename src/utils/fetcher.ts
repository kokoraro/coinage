async function fetcher(method: string, url: string, path: string, data?: any) {
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
