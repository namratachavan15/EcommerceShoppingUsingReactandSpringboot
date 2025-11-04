package com.ecommerceshop.ecommerceshop.controller;

import com.ecommerceshop.ecommerceshop.exception.ProductException;
import com.ecommerceshop.ecommerceshop.model.Product;
import com.ecommerceshop.ecommerceshop.model.Size;
import com.ecommerceshop.ecommerceshop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")

public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<Page<Product>> findProductByCategoryHandler(
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "") List<String> color,
            @RequestParam(defaultValue = "") List<String> size,
            @RequestParam(defaultValue = "0") Integer minPrice,
            @RequestParam(defaultValue = "100000") Integer maxPrice,
            @RequestParam(defaultValue = "0") Integer minDiscount,
            @RequestParam(defaultValue = "price_low") String sort,
            @RequestParam(defaultValue = "") String stock,
            @RequestParam(defaultValue = "0") Integer pageNumber,
            @RequestParam(defaultValue = "5") Integer pageSize
    ) throws ProductException {
        Page<Product> res = productService.getAllProduct(
                category, color, size, minPrice, maxPrice, minDiscount,
                sort, stock, pageNumber, pageSize);

        // ✅ Debug all returned product data
    //    System.out.println("\n========= BACKEND PRODUCT DATA =========");
        System.out.println("Total products fetched: " + res.getContent().size());
//        for (Product p : res.getContent()) {
//            System.out.println("----------------------------------------");
//            System.out.println("ID: " + p.getId());
//            System.out.println("Title: " + p.getTitle());
//            System.out.println("Brand: " + p.getBrand());
//            System.out.println("Color: " + p.getColor());
//            System.out.println("Price: " + p.getPrice());
//            System.out.println("Discounted Price: " + p.getDiscountedPrice());
//            System.out.println("Discount %: " + p.getDiscountPercent());
//            System.out.println("Quantity: " + p.getQuantity());
//            System.out.println("Image URL: " + p.getImageUrl());
//            System.out.println("Category: " + (p.getCategory() != null ? p.getCategory().getName() : "N/A"));
//            System.out.println("Highlights: " + p.getHighlights());
//
//            // ✅ Print sizes
//            System.out.println("Sizes:");
//            for (Size s : p.getSizes()) {
//                System.out.println("   - " + s.getName() + ": " + s.getQuantity());
//            }
//
//            System.out.println("Created At: " + p.getCreatedAt());
//        }
//        System.out.println("========================================\n");

        return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProductHandler(@RequestParam String query) throws ProductException {
        List<Product> products = productService.searchProduct(query);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


    @GetMapping("/products/id/{productId}")
    public ResponseEntity<Product> findProductByIdHandler(@PathVariable Long productId) throws ProductException {
        System.out.println("product id " + productId);
        Product product=productService.findProductById(productId);
        System.out.println("product " + product);
        return new ResponseEntity<>(product,HttpStatus.ACCEPTED);
    }

//    @GetMapping("/products/search")
//    public ResponseEntity <List<Product>> searchProductHandler(@RequestParam String q)
//    {
//        List<Product> products=productService.searchProduct(q);
//        return new ResponseEntity<>(products,HttpStatus.OK);
//
//    }


}
