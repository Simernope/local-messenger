import styles from './MainPage.module.scss'
import React, {FC, useState} from "react";
import Modal from "../../components/Modal/Modal";
import DocNav from "../../components/Doc/DocNav/DocNav";
import DocArticles from "../../components/Doc/DocArticles/DocArticles";

const MainPage: FC = () => {
    const [isModalActive, setIsModalActive] = useState<boolean>(true)
    const [activeArticle, setActiveArticle] = useState<string>("")
    console.log(activeArticle)
    return (
        <div className={`container ${styles.container}`}>
            <Modal isActive={isModalActive} setIsModalOpen={setIsModalActive}/>
            <div className={`row align-items-start`}>
                <div className={`col-2 `}>
                    <div className={`position-fixed`}>
                        <DocNav activeArticle={activeArticle} setActiveArticle={setActiveArticle}/>
                    </div>

                </div>
                <div className={`col-10 `}>
                    <DocArticles activeArticle={activeArticle} setActiveArticle={setActiveArticle}/>
                </div>
            </div>
        </div>
    )
}

export default MainPage