import axios from 'axios';

import Cookies from 'js-cookie';

const axiosClient = axios.create({
    // Đây là baseURL có tất cả các yêu cầu API được gửi thông qua axiosClient.
    baseURL: 'https://be-project-reactjs.onrender.com/api/v1/',
    timeout: 10000, //Optional: Set timeout for request (in ms) //Tránh bị treo

    // Tùy chọn: Đặt các header mặc định cho tất cả các yêu cầu.
    // Ở đây, nó báo cho server biết rằng dữ liệu được gửi trong phần thân (body) của yêu cầu sẽ ở định dạng JSON.
    headers: {
        'Content-Type': 'application/json' //Set common headers (optional)
    }
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

axiosClient.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        // Lấy lại cấu hình của yêu cầu gốc đã gây ra lỗi. Chúng ta cần nó để gửi lại yêu cầu sau khi làm mới token.
        const originalRequest = err.config;

        // Kiểm tra điều kiện làm mới token:
        // !onriginalRequest._retry: Đây là một cờ hiệu tùy chỉnh mà chúng ta thêm vào yêu cầu gốc để ngăn chặn vòng lặp vô hạn.
        // Nếu yêu cầu này đã được thử lại một lần sau khi làm mới token, chúng ta sẽ không thử lại nữa.
        if (err.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Đặt cờ hiệu '_retry' của yêu cầu gốc thành true, đánh dấu rằng nó đã được thử lại một lần.

            const refreshToken = Cookies.get('refreshToken');

            // Nếu không có refresh token, không thể làm mới token, vì vậy từ chối Promise với lỗi gốc. Điều này thường dẫn đến việc người dùng phải đăng nhập lại.
            if (!refreshToken) return Promise.reject(err);

            try {
                // Gửi yêu cầu => endpoint làm mới token.
                const res = await axiosClient.post('/refresh-token', {
                    token: refreshToken // Gửi refreshtoken lên server để đổi lấy token mới.
                });

                // Lấy access token mới từ phản hồi của server
                const newAccessToken = res.data.accessToken;

                // Lưu access token mới vào Cookies, thay thế token cũ
                Cookies.set('token', newAccessToken);

                // Cập nhật header Authorization của yêu cầu gốc với access token mới.
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Gửi lại yêu cầu gốc đã bị lỗi 401.
                // Axios sẽ thực hiện yêu cầu này với header Authorization đã được cập nhật.
                return axiosClient(originalRequest);
            } catch (error) {
                Cookies.remove('token');
                Cookies.remove('refreshToken');

                // Từ chối Promise với lỗi từ quá trình làm mới token.
                return Promise.reject(error);
            }
        }

        // Nếu lỗi không phải là 401 hoặc yêu cầu đã được thử lại, hoặc không có refresh token,
        // thì từ chối Promise với lỗi gốc.
        return Promise.reject(err);
    }
);

export default axiosClient;
