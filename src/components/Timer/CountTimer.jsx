import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

const CountdownTimer = ({ targetData }) => {
    const { box, title } = styles;

    // Có state để lưu thời gian còn lại
    // targetData là thời gian đích mà bạn muốn đếm ngược đến
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const difference = +new Date(targetData) - +new Date();
        let timeLeft = {};

        //Object timeLeft sẽ chứa các giá trị ngày, giờ, phút, giây
        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60 * 24)) % 24),
                Mins: Math.floor((difference / 1000 / 60) % 60),
                Secs: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    //Dùng useEffect để cập nhật thời gian còn lại mỗi giây
    //Khi component được mount, nó sẽ bắt đầu đếm ngược
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    //Format lại số khi có 1 chữ số thì sẽ thêm số 0 ở đầu
    const formatNumber = (number) => {
        return String(number).padStart(2, '0');
    };

    const timerComponents = [];

    //Duyệt qua các key trong object timeLeft và tạo các phần tử hiển thị
    //Nếu giá trị của key đó không undefined thì sẽ hiển thị
    //Ví dụ: nếu timeLeft.days = 0 thì sẽ không hiển thị phần tử đó
    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval] !== undefined) {
            timerComponents.push(
                <span key={interval} className={box}>
                    {formatNumber(timeLeft[interval])} {''}
                    <span className={title}>{interval}</span>{' '}
                </span>
            );
        }
    });

    return timerComponents;
};

export default CountdownTimer;
