import styles from './header.module.css'
export function Header() {
    return (
        <header className={styles.container}>
            <img src="/logo.svg" alt="Logo da aplicação"/>
        </header>
    )
}