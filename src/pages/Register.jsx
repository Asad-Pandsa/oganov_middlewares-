import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../features/auth/authSlice';

const Register = () => {
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        email: '',
        password: '',
        password_confirmation: '',
        name: '',
        phone: '',
        birthday: ''
    }); 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });    
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(form));
    }; 
    return (
        <div className="container">
            <h2>Регистрация</h2>

            <form onSubmit={handleSubmit}> 

                <input 
                name="email"
                placeholder = "Введите email"
                onChange = {handleChange}
                />

                <input 
                name="password"
                placeholder = "Введите пароль"
                onChange = {handleChange}
                />

                <input
                name="password_confirmation"
                placeholder = "Подтвердите пароль"
                onChange = {handleChange}
                />
                
                <input 
                name="name"
                placeholder = "Введите имя"
                onChange = {handleChange} 
                />

                <input
                name="phone"
                placeholder = "Введите телефон"
                onChange = {handleChange}
                />

                <input
                name="birthday"
                placeholder = "Введите дату рождения"
                onChange = {handleChange}
                />

                <button type="submit">Зарегистрироваться</button>

            </form>


        </div>
    );
};

export default Register;