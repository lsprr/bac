import { useState, FormEvent } from 'react';
import axios from 'axios';
import Header from '@/components/shared/Header';
import JWTTokenDisplay from '@/components/JWTTokenDisplay';
import LoginForm from '@/components/LoginForm';

const LoginView = () => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [token, setToken] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!login || !password) {
            return;
        }

        try {
            const response = await axios.post<{ token: string }>('http://localhost:3001/generate_token', { login, password });
            setToken(response.data.token);
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    return (
        <section>
            <Header title={"Login"} />
            <LoginForm onHandleSubmit={handleSubmit} setLogin={setLogin} setPassword={setPassword} />
            {token && <JWTTokenDisplay token={token} />}
        </section>
    );
}

export default LoginView;
