import styles from './styles.module.scss';
import ReloadIcon from '@icons/svgs/reloadIcon.svg';
import HeartIcon from '@icons/svgs/heartIcon.svg';
import BagIcon from '@icons/svgs/bagIcon.svg';
import EyeIcon from '@icons/svgs/eyeIcon.svg';
import cls from 'classnames';
import Button from '@components/Button/Button';
import { useContext, useEffect, useState } from 'react';
import { OurShopContext } from '@/contexts/OurShopContext';
import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { ToastContext } from '@/contexts/ToastProvider';
import { addProductToCart } from '@/apis/cartService';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function ProductItem({ src, prevSrc, name, price, detail, isHomePage = true }) {
    // Lấy ra context để chỉnh dạng lưới hay list
    const ourShopStore = useContext(OurShopContext);
    // Khai báo trạng thái nội bộ 'isShowGrid'. Giá trị khởi tạo được lấy từ context, nếu context tồn tại
    const [isShowGrid, setIsShowGrid] = useState(ourShopStore?.isShowGrid);

    // Lưu trạng thái và hiển thị đã chọn size nào
    const [sizeChoose, setSizeChoose] = useState('');

    const userId = Cookies.get('userId');

    // Khi user ch đăng nhập lhi nhấn add to cart thì sẽ trượt sidebar Login ra
    const { setIsOpen, setType, handleGetListProductsCart } =
        useContext(SideBarContext);
    const { toast } = useContext(ToastContext);

    // Khi add sản phẩm vào cart thì setIsLoading = true và sau khi call API add sản phẩm thành công thì setIsLoading = false
    const [isLoading, setIsLoading] = useState(false);

    const {
        boxImg,
        showImgHover,
        showFuncHover,
        boxIcon,
        title,
        budget,
        productItemWrapper,
        boxSize,
        size,
        textCenter,
        boxBtn,
        content,
        containerItem,
        leftBtn,
        largeImg,
        isActiveSize,
        btnClear
    } = styles;

    // Click vào để chọn size
    const handleChooseSize = (size) => {
        setSizeChoose(size);
    };

    // Xoa size
    const handleClearSize = () => {
        setSizeChoose('');
    };

    const handleAddToCart = () => {
        console.log(userId);
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning('Please login to add product to cart');

            return;
        }

        if (!sizeChoose) {
            toast.warning('Please choose a size!');
            return;
        }

        const data = {
            userId,
            productId: detail._id,
            quantity: 1,
            size: sizeChoose
        };

        setIsLoading(true);

        // Thêm sản phẩm vào giỏ hàng
        addProductToCart(data)
            .then((res) => {
                setIsOpen(true);
                setType('cart');
                toast.success('Add to cart successfully!');
                setIsLoading(false);
                handleGetListProductsCart(userId, 'cart');
            })
            .catch((err) => {
                toast.error('Add to cart failed!');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (isHomePage) {
            // Nếu component được hiển thị trên trang chủ, luôn đặt dạng lưới
            setIsShowGrid(true);
        } else {
            // Ngược lại, lấy giá trị từ context để quyết định dạng lưới/danh sách
            setIsShowGrid(ourShopStore?.isShowGrid);
        }
    }, [isHomePage, ourShopStore?.isShowGrid]);

    return (
        <div className={productItemWrapper}>
            <div className={isShowGrid ? '' : containerItem}>
                <div className={cls(boxImg, { [largeImg]: !isShowGrid })}>
                    <img src={src} alt='' />
                    <img src={prevSrc} alt='' className={showImgHover} />

                    <div className={showFuncHover}>
                        <div className={boxIcon}>
                            <img src={BagIcon} alt='' />
                        </div>
                        <div className={boxIcon}>
                            <img src={HeartIcon} alt='' />
                        </div>
                        <div className={boxIcon}>
                            <img src={ReloadIcon} alt='' />
                        </div>
                        <div className={boxIcon}>
                            <img src={EyeIcon} alt='' />
                        </div>
                    </div>
                </div>

                <div className={isShowGrid ? '' : content}>
                    {!isHomePage &&
                        Array.isArray(detail.size) &&
                        detail.size.some((s) => s.name) && (
                            <div className={boxSize}>
                                {detail.size.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={cls(size, {
                                                [isActiveSize]:
                                                    sizeChoose === item.name
                                            })}
                                            onClick={() =>
                                                handleChooseSize(item.name)
                                            }
                                        >
                                            {item.name}
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    {sizeChoose && (
                        <div
                            className={btnClear}
                            onClick={() => handleClearSize()}
                        >
                            clear
                        </div>
                    )}

                    <div
                        className={cls(title, {
                            [textCenter]: !isHomePage
                        })}
                    >
                        <h2>{name}</h2>
                    </div>
                    {!isHomePage && (
                        <div
                            className={textCenter}
                            style={{
                                marginTop: 5,
                                fontSize: 14,
                                color: '#888888'
                            }}
                        >
                            Brand 01
                        </div>
                    )}
                    <div
                        className={cls(budget, { [textCenter]: !isHomePage })}
                        style={{
                            color: !isHomePage ? '#888' : '#555',
                            marginTop: !isHomePage ? 5 : 0
                        }}
                    >
                        ${price}
                    </div>

                    {!isHomePage && (
                        <div
                            className={cls(boxBtn, { [leftBtn]: !isHomePage })}
                        >
                            <Button
                                content={
                                    isLoading ? (
                                        <LoadingTextCommon />
                                    ) : (
                                        'ADD TO CART'
                                    )
                                }
                                fontSize={11}
                                onClick={handleAddToCart}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
