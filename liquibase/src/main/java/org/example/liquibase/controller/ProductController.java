package org.example.liquibase.controller;

import org.example.liquibase.entity.Product;
import org.example.liquibase.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService; // Inject Service

    // READ (Đọc tất cả)
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.findAll();
    }

    // CREATE (Tạo mới)
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.save(product);
    }

    // UPDATE (Cập nhật)
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        try {
            Product updatedProduct = productService.updateProduct(id, productDetails);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            // Xử lý khi không tìm thấy sản phẩm
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE (Xóa)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            productService.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            // Xử lý khi không tìm thấy sản phẩm
            return ResponseEntity.notFound().build();
        }
    }
}