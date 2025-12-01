// src/App.jsx
import React, { useState, useEffect } from 'react';
import ProductService from './service/ProductService.js'; // <--- CÂU LỆNH IMPORT BẠN CẦN
import ProductForm from './components/ProductForm';

function App() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Tải dữ liệu khi component được mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // Hàm tải dữ liệu từ Backend
    const fetchProducts = () => {
        setLoading(true);
        setError(null);
        ProductService.getAllProducts() // <--- SỬ DỤNG PRODUCTSERVICE
            .then(res => setProducts(res.data))
            .catch(err => {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError("Không thể tải dữ liệu sản phẩm. Vui lòng kiểm tra Backend.");
            })
            .finally(() => setLoading(false));
    };

    // 2. Xử lý Form Submit (Tạo mới hoặc Cập nhật)
    const handleFormSubmit = (productData) => {
        if (editingProduct) {
            ProductService.updateProduct(editingProduct.id, productData)
                .then(() => {
                    fetchProducts();
                    setEditingProduct(null);
                })
                .catch(() => setError("Lỗi khi cập nhật sản phẩm."));
        } else {
            ProductService.createProduct(productData)
                .then(() => fetchProducts())
                .catch(() => setError("Lỗi khi tạo mới sản phẩm."));
        }
    };

    // 3. Xử lý Xóa
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            ProductService.deleteProduct(id)
                .then(() => fetchProducts())
                .catch(() => setError("Lỗi khi xóa sản phẩm. Vui lòng thử lại."));
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
                    Quản Lý Sản Phẩm CRUD
                </h1>

                <ProductForm
                    productToEdit={editingProduct}
                    onSubmit={handleFormSubmit}
                    onCancel={() => setEditingProduct(null)}
                />

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-700">Danh Sách Sản Phẩm</h3>

                    {loading ? (
                        <p className="text-center text-gray-500">Đang tải...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.name}</td>
                                        {/* Định dạng tiền tệ */}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150"
                                            >
                                                Sửa
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900 transition duration-150"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;