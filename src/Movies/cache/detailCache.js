
const detailCache = new Map();


export function setDetailsCache(id, value) {
    detailCache.set(id, value)
}


export function getDetailsCache(id) {
    const exists = detailCache.has(id);

    if (!exists) return 

    return detailCache.get(id)
}


export function clearDetailsCache() {
    detailCache.clear()
}