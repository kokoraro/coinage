async function fetcher<R, B = void>(method: string, url: string, path: string, data?: B): Promise<R> {
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
