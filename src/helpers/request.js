import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';

const useClient = () => {
    const [token] = useLocalStorage('token', null);
    const [language] = useLocalStorage('language', 'uk_UA');

    const options = {
        headers: {
            'Accept-Language': language
        }
    };

    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    const client = axios.create(options);

    client.interceptors.response.use(
        response => response,
        (xhr) => {
            if (xhr.response.status === 401) {
                localStorage.clear();
                window.location.assign('/');
                window.location.reload();
            }

            throw xhr;
        }
    );

    return client;
}

export function useGet (url) {
    const client = useClient();

    return (() => client.get(url));
}

export function usePost (url, data) {
    const client = useClient();

    return (() => client.post(url, data ?? {}));
}