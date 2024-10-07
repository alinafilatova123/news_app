import styles from './OneNews.module.scss'
import penIcon from '../../../public/icons/pen.svg'
import trashIcon from '../../../public/icons/trash.svg'
import { FC, memo } from 'react'
import { NewsDataI } from '../../types'

interface Props {
    item: NewsDataI,
    editNews: (type:string, id: string) => void,
    deleteNews: (id: string) => void
}

const OneNews:FC<Props> = ({item, editNews, deleteNews}) => {

    return (
        <li className={styles['item']}>
            <div className={styles['item__container']}>
                <div className={styles['item__title']}>{item.title}</div>

                <div className={styles['item__actions']}>
                    <div className={styles['item__btn']} onClick={() => editNews('redact', item.id)}>
                        <img src={penIcon} alt='penIcon'/>
                    </div>
                    <div className={styles['item__btn']} onClick={() => deleteNews(item.id)}>
                        <img src={trashIcon} alt='trashIcon'/>
                    </div>
                </div>
            </div>
                
            <p className={styles['item__text']}>{item.text}</p>
            
        </li>
    )
}

export default memo(OneNews)