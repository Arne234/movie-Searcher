
export const movieCache = new Map();


export function setMovieCache(query, value) {

    const search = query.toLowerCase().trim();

    movieCache.set(search, value)
}


export function getMovieCache(query) {

    const search = query.toLowerCase().trim();

    const exists = movieCache.has(search);

    if (!exists) return 

    const data = movieCache.get(search)
    
    return data
}


export function clearMovieCache() {
    movieCache.clear()
}