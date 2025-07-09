import MainLayout from '@components/Layout/Layout';
import { dataInfo } from '@components/Info/constant.js';
import InfoCard from '@components/Info/InfoCard/InfoCard';
import styles from './styles.module.scss';

function Info() {
    const { container } = styles;

    return (
        <>
            <div>
                <MainLayout>
                    <div className={container}>
                        {dataInfo.map((item) => {
                            return (
                                <InfoCard
                                    title={item.title}
                                    description={item.des}
                                    src={item.src}
                                />
                            );
                        })}
                    </div>
                </MainLayout>
            </div>
        </>
    );
}

export default Info;
