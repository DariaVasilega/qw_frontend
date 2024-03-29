import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function DashboardLink() {
    const moveTo = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const goToDashboard = () => {
        moveTo('/');
        setRedirect(true)
    }

    useEffect(() => {
        redirect && moveTo(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirect]);

    return (
        <li key="dashboard">
            {/* eslint-disable-next-line no-script-url */}
            <button onClick={() => goToDashboard()} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                </svg>
                <p className="ml-3 overflow-hidden whitespace-nowrap text-ellipsis">Dashboard</p>
            </button>
        </li>
    );
}