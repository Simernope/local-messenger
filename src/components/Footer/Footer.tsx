import React from "react";
import styles from "./Footer.module.scss";
import {Link} from "react-router-dom";
import logo from "../../logo-chat.svg";

const Footer: React.FC = () => {
    return (
        <div className={`bg-body-tertiary p-3 `}>
            <div className={"row align-items-center"}>

                <Link to={'/'} className={`${styles.link} col-md-4 col-sm-12 d-flex align-items-center`} role="button">
                            <img src={logo} height={'25px'} width={'25px'} alt={'logo'}/>
                            <h5 className={"mx-3"}>Локальный чат</h5>
                </Link>

                <div className={"col-md-4 col-sm-12 d-flex align-items-center justify-content-center"}>Ⓒ2023 Все права
                    защищены
                </div>

                <h5 role="button" className={"col-md-4  d-flex align-items-center justify-content-end"}>
                    <Link to={'/'} className={styles.link}>
                        Контакты
                    </Link></h5>

            </div>
        </div>
    )
}

export default Footer