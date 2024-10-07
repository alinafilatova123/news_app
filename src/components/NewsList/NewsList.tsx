import { FC, Fragment, memo } from "react";
import styles from './NewsList.module.scss'
import OneNews from "../OneNews";
import { NewsDataI } from "../../types";

interface Props {
    allNews: NewsDataI[],
    editNews: (id: string) => void,
    deleteNews: (id: string) => void
}

const NewsList:FC<Props> = ({allNews,editNews,deleteNews}) => {
    return (
        <ul className={styles["list"]}>
            {allNews.length > 0 ? allNews.map(item => (
                <Fragment  key={item.id}>
                    <OneNews item={item} editNews={editNews} deleteNews={deleteNews} />
                </Fragment>
                
            )) : <div>Нет новостей :(</div>}
        </ul>
    )
}

export default memo(NewsList)