import { usePost } from './helpers/request';
import { useLocalStorage } from '@uidotdev/usehooks';

export default function Header({switchSidebar}) {
    const setToken = useLocalStorage('token').at(-1);
    const doLogoutRequest = usePost(`${process.env.REACT_APP_API_URL}/logout`);

    const logout = () => {
        doLogoutRequest().then(xhr => setToken(null) && window.location.assign('/'));
    }

    return (
        <header className="bg-white dark:bg-gray-800 shadow">
            <div className="mx-auto p-2 px-4 sm:p-4 lg:p-6">
                <div className="flex justify-between items-center">
                    <button onClick={switchSidebar} data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <div className="flex w-full justify-end">
                        <button onClick={logout} className="text-gray-500 transition duration-75 hover:text-gray-900 py-2 text-end">
                            <svg className="w-7 h-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}