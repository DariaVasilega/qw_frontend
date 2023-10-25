import React, { useState } from 'react';
import { useLocalStorage } from '@uidotdev/usehooks';
import axios from 'axios';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useLocalStorage('token', null);
    const [userEmail, setUserEmail] = useLocalStorage('email', '');

    const login = (event) => {
        event.preventDefault();

        setUserEmail(email)

        axios.post(`${process.env.REACT_APP_API_URL}/login`, {
            email: email,
            password: password
        })
            .then(xhr => setToken(xhr.data.data.token) && window.location.assign('/'))
            .catch(xhr => setError(
                Array.isArray(xhr.response.data.error.description)
                    ? xhr.response.data.error.description.join('<br/>')
                    :  xhr.response.data.error.description
            ));

    };

    return(
        <section className="bg-gray-50 dark:bg-gray-900 h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to the <span>Staff Study Platform</span>
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={login}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input onChange={(event) => setEmail(event.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" placeholder="name@company.com" required="" value={email}/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-amber-600 focus:border-amber-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-amber-500 dark:focus:border-amber-500" required="" value={password}/>
                            </div>
                            <div className="flex items-start">
                                <p className="text-rose-500">{error}</p>
                            </div>
                            <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
