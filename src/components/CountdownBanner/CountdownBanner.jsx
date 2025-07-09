import CountdownTimer from '@components/Timer/CountTimer';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';

function CountdownBanner() {
    const targetData = '2025-12-31T23:59:59'; // Thay đổi thời gian đích theo nhu cầu
    const { container, containerTimer, title, btn } = styles;
    return (
        <div className={container}>
            <div className={containerTimer}>
                <CountdownTimer targetData={targetData} />
            </div>
            <h2 className={title}>The Classics Make A Comeback</h2>
            <div className={btn}>
                <Button content={'Shop now'} />
            </div>
        </div>
    );
}

export default CountdownBanner;
