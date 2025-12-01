// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const ProductForm = ({ productToEdit, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            // Đảm bảo giá là string để hiển thị trong input type="number"
            setPrice(productToEdit.price?.toString() || '');
            setDescription(productToEdit.description || '');
        } else {
            // Reset form khi tạo mới
            setName('');
            setPrice('');
            setDescription('');
        }
    }, [productToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !price) return;

        const productData = { name, price: parseFloat(price), description };
        onSubmit(productData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
                {productToEdit ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Tên Sản Phẩm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                    type="number"
                    placeholder="Giá (VNĐ)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <textarea
                    placeholder="Mô tả"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex space-x-4">
                    <button
                        type="submit"
                        className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-150"
                    >
                        {productToEdit ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
                    </button>
                    {productToEdit && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-1/4 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition duration-150"
                        >
                            Hủy
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ProductForm;