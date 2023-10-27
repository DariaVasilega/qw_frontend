import React, {useEffect, useState} from "react";
import {useGet} from "../helpers/request";
import {useNavigate} from "react-router-dom";

export default function Item({lection}) {
    const moveTo = useNavigate();
    const [redirect, setRedirect] = useState(false);
    const [showTests, setShowTests] = useState(false);
    const [tests, setTests] = useState([]);
    const [isTestsRequested, setIsTestsRequested] = useState(false);
    const doGetLectionTests = useGet(`${process.env.REACT_APP_API_URL}/tests?limit=9999999&lection_id=${lection.id}`);
    const processTests = async () => {
        setShowTests(!showTests)

        if (tests.length || isTestsRequested) {
            return;
        }

        doGetLectionTests().then(xhr => {
            setIsTestsRequested(true)
            setTests(xhr.data.data.tests)
        });
    }
    const redirectTo = (url) => {
        moveTo(url);
        setRedirect(true)
    }

    useEffect(() => {
        redirect && moveTo(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [redirect]);

    return (
        <li key={lection.id}>
            {/* eslint-disable-next-line no-script-url */}
            <button onDoubleClick={() => redirectTo(`/lection/${lection.id}`)} onClick={() => processTests()} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls={`tests-for-${lection.id}`} data-collapse-toggle={`tests-for-${lection.id}`}>
                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M9 1.334C7.06.594 1.646-.84.293.653a1.158 1.158 0 0 0-.293.77v13.973c0 .193.046.383.134.55.088.167.214.306.366.403a.932.932 0 0 0 .5.147c.176 0 .348-.05.5-.147 1.059-.32 6.265.851 7.5 1.65V1.334ZM19.707.653C18.353-.84 12.94.593 11 1.333V18c1.234-.799 6.436-1.968 7.5-1.65a.931.931 0 0 0 .5.147.931.931 0 0 0 .5-.148c.152-.096.279-.235.366-.403.088-.167.134-.357.134-.55V1.423a1.158 1.158 0 0 0-.293-.77Z"/>
                </svg>
                <p className="ml-3 overflow-hidden whitespace-nowrap text-ellipsis">Lection: {lection.id} | <span>{lection.text}</span></p>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
            </button>
            <ul id={`tests-for-${lection.id}`} className={`${showTests ? '' : 'hidden'} py-2 space-y-2 ml-3`}>
                {
                    tests.map(test => (
                        <li onClick={() => redirectTo(`/test/${test.id}`)} key={test.id} className="hover:cursor-pointer">
                            <p className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                                    <path d="M13.383.076a1 1 0 0 0-1.09.217L11 1.586 9.707.293a1 1 0 0 0-1.414 0L7 1.586 5.707.293a1 1 0 0 0-1.414 0L3 1.586 1.707.293A1 1 0 0 0 0 1v18a1 1 0 0 0 1.707.707L3 18.414l1.293 1.293a1 1 0 0 0 1.414 0L7 18.414l1.293 1.293a1 1 0 0 0 1.414 0L11 18.414l1.293 1.293A1 1 0 0 0 14 19V1a1 1 0 0 0-.617-.924ZM10 15H4a1 1 0 1 1 0-2h6a1 1 0 0 1 0 2Zm0-4H4a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2Zm0-4H4a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                                </svg>
                                <span className="ml-3 overflow-hidden whitespace-nowrap text-ellipsis">{test.label}</span>
                            </p>
                        </li>
                    ))
                }
            </ul>
        </li>
    )
}