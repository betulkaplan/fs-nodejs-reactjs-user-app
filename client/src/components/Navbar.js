import React from 'react'
import style from './styles/Navbar.module.css'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {

    const { name, user, setUser } = useAuth();

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/login')
        console.log('handleLogin')
    }
    const handleLogout = () => {
        navigate('/')
        console.log('handleLogin')
    }
    const handleRegister = () => {
        navigate('/register')
        console.log('handleRegister')
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.leftSide}>
                    <img src={logo} alt="" />
                </div>
                <div className={style.rightSide}>
                    <ul>
                        {
                            user.email ?
                                <>
                                    <li>{user.email}</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </>
                                :
                                <>
                                    <li onClick={handleLogin}>Login</li>
                                    <li onClick={handleRegister}>Register</li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
