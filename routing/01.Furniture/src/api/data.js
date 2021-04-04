import { buildApi } from './api.js';

const api = buildApi('http://localhost:3030');

const endpoints = {
    ALL_FURNITURE: '/data/catalog',
    MY_FURNITURE: '/data/catalog?where=_ownerId%3D%22{userId}%22',
};

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);
export async function getAllFurniture() { return await api.get(endpoints.ALL_FURNITURE); }
export async function getFurnitureDetails(id) { return await api.get(endpoints.ALL_FURNITURE + '/' + id); }
export async function getMyFurniture(userId) { return await api.get(endpoints.MY_FURNITURE.replace('{userId}', userId)); }
export async function createFurniture(data) { return await api.post(endpoints.ALL_FURNITURE, data); }
export async function updateFurniture(id, data) { return await api.put(endpoints.ALL_FURNITURE + '/' + id, data); }
export async function deleteFurniture(id) { return await api.delete(endpoints.ALL_FURNITURE + '/' + id); }