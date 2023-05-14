import React, {FC} from "react";
import {HashLink} from "react-router-hash-link";

interface DocNavProps {
    activeArticle: string
    setActiveArticle: React.Dispatch<React.SetStateAction<string>>

}

const DocNav: FC<DocNavProps> = ({activeArticle, setActiveArticle}) => {
    console.log(activeArticle)
    return (
        <>
            <ul className="nav flex-column">
                <li className={`nav-item nav-link ${activeArticle === "overview" ? 'text-primary' : 'text-secondary'}`}>
                    <HashLink to={`#overview`}
                              smooth
                              style={{textDecoration: 'none', color: 'inherit'}}
                              onClick={() => setActiveArticle('overview')}
                              aria-current="page">Обзор</HashLink>
                </li>
                <li className={`nav-item nav-link ${activeArticle === "tech" ? 'text-primary' : 'text-secondary'}`}>
                    <HashLink to={`#tech`}
                              smooth
                              style={{textDecoration: 'none', color: 'inherit'}}
                              onClick={() => setActiveArticle('overview')}
                              aria-current="page">Технологии</HashLink>
                </li>
                <li className={`nav-item nav-link ${activeArticle === "structure" ? 'text-primary' : 'text-secondary'}`}>
                    <HashLink to={`#structure`}
                              smooth
                              style={{textDecoration: 'none', color: 'inherit'}}
                              onClick={() => setActiveArticle('structure')}
                              aria-current="page">Структура</HashLink>
                </li>
                <li className={`nav-item nav-link ${activeArticle === "logic" ? 'text-primary' : 'text-secondary'}`}>
                    <HashLink to={`#logic`}
                              smooth
                              style={{textDecoration: 'none', color: 'inherit'}}
                              onClick={() => setActiveArticle('logic')}
                              aria-current="page">Логика работы</HashLink>
                </li>
                <li className={`nav-item nav-link ${activeArticle === "localstorage" ? 'text-primary' : 'text-secondary'}`}>
                    <HashLink to={`#localstorage`}
                              smooth
                              style={{textDecoration: 'none', color: 'inherit'}}
                              onClick={() => setActiveArticle('localstorage')}
                              aria-current="page">LocalStorage</HashLink>
                </li>
            </ul>
        </>
    )
}

export default DocNav