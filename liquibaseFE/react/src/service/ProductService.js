// src/services/ProductService.js
import axios from 'axios';

// URL của Backend Controller (Spring Boot)
const API_URL = 'http://localhost:8080/api/products';

class ProductService {

    // READ (Đọc tất cả) - GET
    getAllProducts() {
        return axios.get(API_URL);
    }

    // CREATE (Tạo mới) - POST
    createProduct(product) {
        return axios.post(API_URL, product);
    }

    // UPDATE (Cập nhật) - PUT
    updateProduct(id, product) {
        return axios.put(`${API_URL}/${id}`, product);
    }

    // DELETE (Xóa) - DELETE
    deleteProduct(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new ProductService();