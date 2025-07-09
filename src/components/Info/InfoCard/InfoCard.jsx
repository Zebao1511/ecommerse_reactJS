import styles from '../styles.module.scss';
import truckIcon from '@icons/svgs/truckIcon.svg';

function InfoCard({ title, description, src }) {
    const { containerCard, containerContent, content, des } = styles;

    return (
        <div className={containerCard}>
            <img
                height={38}
                width={38}
                style={{ marginRight: '20px', color: '#fff' }}
                src={src}
            />
            <div className={containerContent}>
                <div className={content}>{title}</div>
                <div className={des}>{description}</div>
            </div>
        </div>
    );
}

export default InfoCard;
