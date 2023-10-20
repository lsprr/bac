import { useState } from 'react';
import axios from 'axios';

export default function LoginView() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/generate_token', { login, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    return (
        <section>
            <Header />
            <LoginForm onHandleSubmit={handleSubmit} setLogin={setLogin} setPassword={setPassword} />
            {token && <JWTTokenDisplay token={token} />}
        </section>
    );
}

function Header() {
    return (
        <header>
            <h2 className="text-2xl font-bold mt-5">
                Login
            </h2>
        </header>
    );
}

function LoginForm({ onHandleSubmit, setLogin, setPassword }) {
    return (
        <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={onHandleSubmit}>
            <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="Username"
                    className="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>

                <input
                    type="text"
                    id="Username"
                    name="username"
                    onChange={e => setLogin(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                    Log In
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    <a href="#" className="text-gray-700 underline">Create an Account</a>
                </p>
            </div>
        </form>
    );
}

function JWTTokenDisplay({ token }) {
    return (
        <div className="mt-8 grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <p className="mt-4 text-sm text-gray-500 sm:mt-0 break-all">
                    {token}
                </p>
            </div>
        </div>
    )
}