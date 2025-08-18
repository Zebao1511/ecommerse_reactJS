import BoxIcon from './BoxIcon/BcxIcon';
import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constant';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.webp';
import useScrollHanding from '@/hooks/useScrollHandling';
import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { TfiReload } from 'react-icons/tfi';
import { FiHeart } from 'react-icons/fi';
import { FiShoppingCart } from 'react-icons/fi';

function Header() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container,
        fixedHeader,
        topHeader,
        boxCart,
        quantity
    } = styles;

    const { scrollPosition } = useScrollHanding();
    const [stickPosition, setStickPosition] = useState(false);

    const { setType, setIsOpen, listProductsCart } = useContext(SideBarContext);

    const handleOnpenSideBar = (type) => {
        setIsOpen(true);
        setType(type);
    };

    useEffect(() => {
        setStickPosition(scrollPosition > 80 ? true : false);
    }, [scrollPosition]);

    return (
        <div
            className={classNames(container, topHeader, {
                [fixedHeader]: stickPosition
            })}
        >
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
                                <Menu
                                    content={item.content}
                                    href={item.href}
                                    setIsOpen={setIsOpen}
                                />
                            );
                        })}
                    </div>

                    <div className={containerBoxIcon}>
                        <TfiReload
                            size={20}
                            onClick={() => handleOnpenSideBar('compare')}
                        />
                        <FiHeart
                            size={20}
                            onClick={() => handleOnpenSideBar('wishList')}
                        />
                        <div className={boxCart}>
                            <FiShoppingCart
                                size={20}
                                onClick={() => handleOnpenSideBar('cart')}
                            />
                            <div className={quantity}>
                                {listProductsCart.length}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
