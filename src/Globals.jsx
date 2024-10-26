import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const BASE_URL = '';
export const MEDIA_URL = 'https://alphaforumstorage.blob.core.windows.net';

export function getUserLocalStorage () {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
}

export async function logout() {
    return axios.get(`${BASE_URL}/account/logout`)
    .then(() => localStorage.removeItem('user'))
    .catch((e) => console.log(e));
}

export async function getCsrfToken () {
    return axios.get(`${BASE_URL}/account/get_csrf_token`)
    .then((resp) => {return resp.data.token})
    .catch((e) => console.log(e));
}