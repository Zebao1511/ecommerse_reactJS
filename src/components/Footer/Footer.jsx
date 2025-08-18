import { dataMenu } from '@components/Footer/constant';
import styles from './styles.module.scss';

function Footer() {
    const { container, boxNav, copyRight } = styles;

    return (
        <div className={container}>
            <div>
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/marseille-logo.png'
                    alt=''
                    width={160}
                />
            </div>

            <div className={boxNav}>
                {dataMenu.map((item) => {
                    return <div>{item.content}</div>;
                })}
            </div>

            <div>
                <p
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        marginTop: '0'
                    }}
                >
                    Guaranteed safe ckeckout
                </p>
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/elementor/thumbs/Icons-123-pzks3go5g30b2zz95xno9hgdw0h3o8xu97fbaqhtb6.png'
                    alt=''
                    style={{ marginBottom: '40px' }}
                />
            </div>

            <div className={copyRight}>
                <p>
                    Copyright © 2024 XStore theme. Created by 8theme – WordPress
                    WooCommerce themes.
                </p>
            </div>
        </div>
    );
}

export default Footer;
