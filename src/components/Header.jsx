import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ui/uiSlice";
import "../styles/header.css";
import logo from "../photo/My_Logo.png";
import { FaMoon, FaUser } from "react-icons/fa";
import AuthModal from "./AuthModal";

const Header = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <header className="header">
            <div className="header-inner container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>

                <nav className="nav">
                    <a href="#">Главная</a>
                    <a href="#">О нас</a>
                    <a href="#">Контакты</a>
                </nav>

                <div className="header-actions">
                    <button className="btn" onClick={() => dispatch(toggleTheme())}>
                        <FaMoon />
                    </button>
                    <button className="btn" onClick={() => setIsModalOpen(true)}>
                        <FaUser />
                    </button>
                </div>

                {isModalOpen && <AuthModal onClose={() => setIsModalOpen(false)} />}
            </div>
        </header>
    )
}

export default Header