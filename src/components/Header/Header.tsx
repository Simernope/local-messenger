import React, {useState} from "react";
import styles from './Header.module.scss'
import {NavLink} from "react-router-dom";
import logo from '../../logo-chat.svg'
import Modal from "../Modal/Modal";

const Header: React.FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(false)
    return (
        <>
            <Modal isActive={isModalActive} setIsModalOpen={setIsModalActive}/>
            <div className={`bg-body-tertiary d-flex align-items-center justify-content-between p-3 ${styles.header}`}>
                <NavLink to={'/'} className={`${styles.link}`} role="button">
                    <div className={`${styles.logo} d-flex align-items-center justify-content-between`}>


                        <img src={logo} height={'25px'} width={'25px'} alt={'logo'}/>


                        <h3 className={"mx-3"}>Локальный чат</h3>


                    </div>
                </NavLink>
                <button type="button" className="btn btn-outline-primary" onClick={() => setIsModalActive(true)}>Войти в чат</button>
            </div>
        </>

    )
}

export default Header