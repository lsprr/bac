import { useState, FormEvent } from 'react';
import axios from 'axios';
import Header from '@/components/shared/Header';
import JWTTokenDisplay from '@/components/JWTTokenDisplay';
import LoginForm from '@/components/LoginForm';

const API_ENDPOINT = 'http://localhost:3001/generate_token';

const LoginView = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!login || !password) return;

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post<{ token: string }>(API_ENDPOINT, { login, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Error generating token:', error);
            setError('Failed to generate token. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            <Header title={"Login"} />
            <LoginForm onSubmit={handleSubmit} setLogin={setLogin} setPassword={setPassword} loading={loading} />
            {error &&
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-5" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            }
            {token &&
                <JWTTokenDisplay token={token} />
            }
        </section>
    );
}

export default LoginView;
