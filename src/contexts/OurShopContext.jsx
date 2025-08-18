import { createContext, useEffect, useState } from 'react';
import { getProducts } from '@/apis/ProductsService';
import { data } from 'react-router-dom';

export const OurShopContext = createContext();

export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { label: 'Default sorting', value: '0' },
        { label: 'Sort by popularity', value: '1' },
        { label: 'Sort by average rating', value: '2' },
        { label: 'Sort by latest', value: '3' },
        { label: 'Sort by price: low to high', value: '4' },
        { label: 'Sort by price: high to low', value: '5' }
    ];

    const showOptions = [
        { label: '8', value: '8' },
        { label: '12', value: '12' },
        { label: 'All', value: 'all' }
    ];

    // Khi dùng Filter là sẽ lưu những options này bao gồm cả items sau khi filter,
    // vào 1 state (cụ thể là lưu vào context) và sẽ call xuống API query DB để render ra sản phẩm tương ứng

    // Lưu sort
    const [sortId, setSortId] = useState('0');

    // Lưu show
    const [showId, setShowId] = useState('8');

    // Có 1 biến để ng dùng biết được đang chọn hiển thị dạng lưới hay danh sách
    const [isShowGrid, setIsShowGrid] = useState(true);

    // Lưu sản phẩm vào state
    const [products, setProducts] = useState([]);

    // Trạng thái đang call API để user biết mà chờ
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    // Lưu trạng thái page / số trang hiển thị
    const [page, setPage] = useState(1);
    // Trạng thái khi total = lenght thì không hiển thị button LOAD MORE
    const [total, setTotal] = useState(0);

    const handleLoadMore = () => {
        const query = {
            sortType: sortId,
            page: +page + 1,
            limit: showId
        };
        setIsLoadMore(true);
        getProducts(query)
            .then((res) => {
                // Đảm bảo các sp sau khi load nối với các sp trước đó chứ không phải là replace
                setProducts((prev) => {
                    return [...prev, ...res.contents];
                });
                // Lấy total từ API gán vào setTotal
                setTotal(res.total);
                setPage(+res.page);
                setIsLoadMore(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const values = {
        sortOptions,
        showOptions,
        setSortId,
        setShowId,
        setIsShowGrid,
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isLoadMore
    };

    useEffect(() => {
        const query = {
            sortType: sortId,
            page: 1,
            limit: showId
        };
        setPage(1);
        setIsLoading(true);
        getProducts(query)
            .then((res) => {
                setProducts(res.contents);
                // Lấy total từ API gán vào setTotal
                setTotal(res.total);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, [sortId, showId]);

    return (
        <OurShopContext.Provider value={values}>
            {children}
        </OurShopContext.Provider>
    );
};
