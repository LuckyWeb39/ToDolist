import styles from './PageNotFound.module.css'
import {NavButton} from "@/common/components";
import {Link} from 'react-router'

export const PageNotFound = () => (
    <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Page Not Found</h2>
        <NavButton component={Link} to="/"> Вернуться на главную страницу </NavButton>
    </div>
)

