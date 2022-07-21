const BASE_URL = `https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev`

export const queryLang = async (lang) => {
    const SEARCH_URL = BASE_URL + `/languages?keyword=${lang}`;
    try {
        const res = await fetch(SEARCH_URL);
        const data = await res.json();
        return data;
    } catch (err) {
        throw new Error(err);
    }
}