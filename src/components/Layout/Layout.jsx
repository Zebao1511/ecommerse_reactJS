import styles from './styles.module.scss';

function MainLayout({ children }) {
    const { warpLayout, container } = styles;

    return (
        <main className={warpLayout}>
            <div className={container}>{children}</div>
        </main>
    );
}

export default MainLayout;
