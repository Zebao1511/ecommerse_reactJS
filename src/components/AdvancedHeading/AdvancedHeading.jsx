import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';

function AdvancedHeading() {
    const { container, content, des } = styles;
    return (
        <MainLayout>
            <div className={container}>
                <span className={content}>DON'T MISS SUPER OFFERS</span>
                <h2 className={des}>Our best products</h2>
            </div>
        </MainLayout>
    );
}

export default AdvancedHeading;
