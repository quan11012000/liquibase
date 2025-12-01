package org.example.liquibase.service;

import org.example.liquibase.entity.Product;
import org.example.liquibase.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // READ (Đọc tất cả)
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    // CREATE (Tạo mới)
    public Product save(Product product) {
        // Có thể thêm logic kiểm tra dữ liệu hoặc logic kinh doanh ở đây
        return productRepository.save(product);
    }

    // READ (Đọc theo ID)
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    // UPDATE (Cập nhật)
    public Product updateProduct(Long id, Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found for this id :: " + id));

        // Cập nhật thông tin từ chi tiết mới
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setDescription(productDetails.getDescription());

        // Lưu lại và trả về
        return productRepository.save(product);
    }

    // DELETE (Xóa)
    public void deleteById(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found for this id :: " + id);
        }
        productRepository.deleteById(id);
    }
}