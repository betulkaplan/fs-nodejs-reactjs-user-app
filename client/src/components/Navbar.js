import React from 'react'
import style from './styles/Navbar.module.css'
import logo from '../assets/logo.svg'

const Navbar = () => {

    const handleLogin = () => {
        console.log('handleLogin')
    }
    const handleRegister = () => {
        console.log('handleRegister')
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.leftSide}>
                    <img src={logo} alt="" srcset="" />
                </div>
                <div className={style.rightSide}>
                    <ul>
                        <li onClick={handleLogin}>Login</li>
                        <li onClick={handleRegister}>Register</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
