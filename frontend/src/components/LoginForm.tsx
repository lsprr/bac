import { FormEvent } from 'react';

interface LoginFormProps {
    onHandleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    setLogin: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ onHandleSubmit, setLogin, setPassword }) => {
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
                    className="mt-2 bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
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
                    className="mt-2 bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
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
    )
}

export default LoginForm;