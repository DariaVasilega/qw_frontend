import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';

const useOptions = () => {
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

    return options;
}

export function useGet (url) {
    const options = useOptions();

    return (() => axios.get(url, options));
}

export function usePost (url, data) {
    const options = useOptions();

    return (() => axios.post(url, data ?? {}, options));
}