// postcss.config.js (Đã sửa lỗi)
export default {
    plugins: {
        '@tailwindcss/postcss': {}, // <--- Sửa thành tên gói mới
        autoprefixer: {},
    },
}