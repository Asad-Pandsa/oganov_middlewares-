import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, register } from '../features/auth/authSlice';
import '../styles/AuthModal.css';

const AuthModal = ({ onClose }) => {
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            dispatch(login(form));
        } else {
            dispatch(register(form));
        }
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2 className="modal-title">{isLogin ? 'Вход' : 'Регистрация'}</h2>
                
                <form className="modal-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input 
                            name="name" 
                            type="text" 
                            placeholder="Ваше имя" 
                            value={form.name} 
                            onChange={handleChange} 
                            required 
                        />
                    )}
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email" 
                        value={form.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        name="password" 
                        type="password" 
                        placeholder="Пароль" 
                        value={form.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                
                <div className="modal-toggle">
                    {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Создать' : 'Войти'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
