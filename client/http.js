export async function fetchJSON(url, options = {}) {
    const res = await fetch(url, {
        method: options.method || "get",
        headers: options.json ? {"content-type": "application/json"} : {},
        body: options.json && JSON.stringify(options.json),
    });
    if (!res.ok) {
        throw new Error(`Failed ${res.status}: ${(await res).statusText}`);
    }
    if (res.status === 200) {
        return await res.json();
    }
}
export async function postJSON(url, object) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(object),
    });
    if (!res.ok) {
        throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
    }
}
