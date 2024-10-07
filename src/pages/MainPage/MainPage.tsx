import { FC, memo, useCallback, useEffect, useState } from "react";
import NewsList from "../../components/NewsList";
import styles from './MainPage.module.scss'
import MyModal from "../../components/Modal";
import { v4 as uuidv4 } from 'uuid';
import { NewsDataI } from "../../types";

const MainPage:FC = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalType, setModalType] = useState('new')
    const [newsId, setNewsId] = useState('')
    const [formError, setFormError] = useState(false)
    const [allNews, setAllNews] = useState<NewsDataI[]>([])
    const [newsData, setNewsData] = useState<NewsDataI>({title: '', text: '', id: ''})

    const openModal = useCallback((type:string = 'new', id?:string) => {
        setModalIsOpen(prev => !prev)
        setModalType(type)
        if(type !== 'new' && id) {
            setNewsId(id)
            const currData = allNews.filter((item) => item.id === id);
            setNewsData({title: currData[0].title, text: currData[0].text, id: id})
        }
    }, [allNews])

    const closeModal = () => {
        setModalIsOpen(false)
        setNewsData({title: '', text: '', id: ''})
        setFormError(false)
    }

    const editNews = () => {
        if(!newsData.title.length || !newsData.text) {
            setFormError(true)
            return
        }

        const updatedData = allNews.map(item => {
            if (item.id === newsId) {
                return {
                    ...item,
                    title: newsData.title,
                    text: newsData.text,
                }
            }
            return item;
        })

        localStorage.setItem("news", JSON.stringify(updatedData));
        setFormError(false)
        window.location.reload()
    }

    const deleteNews = useCallback((id:string) => {
        const newData = allNews.filter((item) => item.id !== id);
        setAllNews(newData);
        localStorage.setItem("news", JSON.stringify(newData));
    }, [allNews])

    const createNews = () => {
        if(!newsData.title.length || !newsData.text) {
            setFormError(true)
            return
        }
        const newsItem = {
            id: uuidv4(),
            title: newsData.title,
            text: newsData.text
        }
        setAllNews(prev => [...prev, newsItem])
        localStorage.setItem("news", JSON.stringify([...allNews, newsItem]));
        setFormError(false)
        closeModal()
    }

    const getNews = () => {
        const data: string | null = localStorage.getItem("news");
        setAllNews(data ? JSON.parse(data) : [])
    }

    const onSubmitHandler = (type: string, e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (type === 'new') createNews()
        else editNews()
    }

    useEffect(() => {
        getNews()
    }, [])
    

    const modalContent = <form 
            className={styles["form"]} 
            onSubmit={(e) => onSubmitHandler(modalType, e)}
        >
        <input 
            type="text" 
            value={newsData.title}
            onChange = { (e) => setNewsData({ ...newsData, title:e.target.value }) }
        />
        <textarea 
            value={newsData.text}
            onChange = { (e) => setNewsData({ ...newsData, text:e.target.value }) }
        />
        <input className={styles["form__btn"]}  type="submit" value="Сохранить"/>
        {formError && <div className={styles["form__err"]}>Заполните все поля!</div>}
    </form>

    return (
        <div className={styles["page"]}>
            <div className={styles["page__header"]}>
                <h1 className={styles["page__title"]}>Новости</h1>
                <button 
                    className={styles["page__btn"]}
                    onClick={() => openModal()}
                />
            </div>
            
            <NewsList allNews={allNews} editNews={openModal} deleteNews={deleteNews}/>
            <MyModal 
                modalIsOpen={modalIsOpen} 
                closeModal={closeModal}
                title={'Создать новость'}
                modalContent={modalContent}
            />
        </div>
    )
}

export default memo(MainPage)