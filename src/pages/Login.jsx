import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { login } from '../features/auth/authSlice';

const Login = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };

    return (
        <div className='container'>
            <h2>Вход</h2>

            <form onSubmit={handleSubmit}> 

                <input 
                    name="email"
                    placeholder="Введите email"
                    onChange={handleChange}
                />

                <input 
                    name="password"
                    placeholder="Введите пароль"
                    onChange={handleChange}
                />

                <input
                    name="password_confirmation"
                    placeholder="Подтвердите пароль"
                    onChange={handleChange}
                />
                
                <input 
                    name="name"
                    placeholder="Введите имя"
                    onChange={handleChange} 
                />

                <input
                    name="phone"
                    placeholder="Введите телефон"
                    onChange={handleChange}
                />

                <input
                    name="birthday"
                    placeholder="Введите дату рождения"
                    onChange={handleChange}
                />

                <button type="submit">Авторизация</button>

            </form>
        </div>
    );
};

export default Login;