import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function getAllArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc');
}
export async function getHomeArticles() {
    return await api.get(host + '/data/wiki?sortBy=_createdOn%20desc&distinct=category');
}
export async function getArticlesById(id) {
    return await api.get(host + '/data/wiki/' + id);
}
export async function getSearchArticles(query) {
    return await api.get(host + `/data/wiki?where=title%20LIKE%20%22${query}%22`)
}
export async function createArticles(art) {
    return await api.post(host + '/data/wiki', art);
}
export async function updateArticles(id, art) {
    return await api.put(host + '/data/wiki/' + id, art);
}
export async function deleteArticles(id) {
    return await api.del(host + '/data/wiki/' + id);
}
