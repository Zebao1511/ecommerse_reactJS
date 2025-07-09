import BoxIcon from './BoxIcon/BcxIcon';
import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constant';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.webp';
import ReloadIcon from '@icons/svgs/reloadIcon.svg';
import HeartIcon from '@icons/svgs/heartIcon.svg';
import CartIcon from '@icons/svgs/cartIcon.svg';

function Header() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container
    } = styles;
    return (
        <div className={container}>
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        {dataBoxIcon.map((item) => {
                            return (
                                <BoxIcon type={item.type} href={item.href} />
                            );
                        })}
                    </div>

                    <div className={containerMenu}>
                        {dataMenu.slice(0, 3).map((item) => {
                            return (
                                <Menu content={item.content} href={item.href} />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <img
                        src={Logo}
                        alt=''
                        width={153}
                        height={53}
                        style={{ margin: '0 10px' }}
                    />
                </div>
                <div className={containerBox}>
                    <div className={containerMenu}>
                        {dataMenu.slice(3, dataMenu.length).map((item) => {
                            return (
                                <Menu content={item.content} href={item.href} />
                            );
                        })}
                    </div>

                    <div className={containerBoxIcon}>
                        <img
                            src={ReloadIcon}
                            alt='reloadIcon'
                            width={22}
                            height={22}
                            style={{ marginRight: '5px' }}
                        />
                        <img
                            src={HeartIcon}
                            alt='heartIcon'
                            width={22}
                            height={22}
                            style={{ marginLeft: '5px', marginRight: '5px' }}
                        />
                        <img
                            src={CartIcon}
                            alt='cartIcon'
                            width={22}
                            height={22}
                            style={{ marginLeft: '5px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
