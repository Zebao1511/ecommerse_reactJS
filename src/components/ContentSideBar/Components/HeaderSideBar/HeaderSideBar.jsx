import styles from './styles.module.scss';

function HeaderSideBar({ icon, title }) {
    const { container, boxTitle } = styles;

    return (
        <div className={container}>
            {icon}
            <div className={boxTitle}>{title}</div>
        </div>
    );
}

export default HeaderSideBar;
