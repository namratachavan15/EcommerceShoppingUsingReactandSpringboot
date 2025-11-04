package com.ecommerceshop.ecommerceshop.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.*;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private int price;
    private int discountedPrice;
    private int discountPercent;

    private int quantity;
    private String brand;
    private String color;
    private String imageUrl;

    private int numRatings;
    private LocalDateTime createdAt;

    // ✅ Category
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // ✅ Sizes (Embedded value object)
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_sizes", joinColumns = @JoinColumn(name = "product_id"))
    private Set<Size> sizes = new HashSet<>();

    // ✅ Highlights
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "product_highlights", joinColumns = @JoinColumn(name = "product_id"))
    @Column(name = "highlight")
    private List<String> highlights = new ArrayList<>();

    // ✅ Relationships
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Rating> ratings = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Review> reviews = new ArrayList<>();



    @Transient
    private Double averageRating;

    @Transient
    private Long ratingCount;

    @Transient
    private Long reviewCount;

    // ✅ Auto-calculate before returning to frontend
    public Double getAverageRating() {
        if (ratings == null || ratings.isEmpty()) {
            System.out.println("⚠️ No ratings found for product: " + this.title);
            return 0.0;
        }

        System.out.println("⭐ Ratings for product: " + this.title);
        ratings.forEach(rating -> {
            System.out.println("   → Rating ID: " + rating.getId() + " | Value: " + rating.getRating());
        });

        double avg = ratings.stream()
                .mapToDouble(Rating::getRating)
                .average()
                .orElse(0.0);

        double roundedAvg = Math.round(avg * 10.0) / 10.0;
        System.out.println("✅ Average Rating for " + this.title + " = " + roundedAvg);

        return roundedAvg;
    }



    public Long getRatingCount() {
        return ratings != null ? (long) ratings.size() : 0L;
    }

    public Long getReviewCount() {
        return reviews != null ? (long) reviews.size() : 0L;
    }

    // ✅ Constructors
    public Product() {}

    public Product(Long id, String title, String description, int price, int discountedPrice, int discountPercent, int quantity, String brand, String color, String imageUrl, int numRatings, LocalDateTime createdAt, Category category, Set<Size> sizes, List<String> highlights, List<OrderItem> orderItems, List<Rating> ratings, List<Review> reviews, Double averageRating, Long ratingCount, Long reviewCount) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.discountPercent = discountPercent;
        this.quantity = quantity;
        this.brand = brand;
        this.color = color;
        this.imageUrl = imageUrl;
        this.numRatings = numRatings;
        this.createdAt = createdAt;
        this.category = category;
        this.sizes = sizes;
        this.highlights = highlights;
        this.orderItems = orderItems;
        this.ratings = ratings;
        this.reviews = reviews;
        this.averageRating = averageRating;
        this.ratingCount = ratingCount;
        this.reviewCount = reviewCount;
    }

    // ✅ Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getDiscountedPrice() { return discountedPrice; }
    public void setDiscountedPrice(int discountedPrice) { this.discountedPrice = discountedPrice; }

    public int getDiscountPercent() { return discountPercent; }
    public void setDiscountPercent(int discountPercent) { this.discountPercent = discountPercent; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public int getNumRatings() { return numRatings; }
    public void setNumRatings(int numRatings) { this.numRatings = numRatings; }

    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }

    public Set<Size> getSizes() { return sizes; }
    public void setSizes(Set<Size> sizes) { this.sizes = sizes; }

    public List<String> getHighlights() { return highlights; }
    public void setHighlights(List<String> highlights) { this.highlights = highlights; }

    public List<Rating> getRatings() { return ratings; }
    public void setRatings(List<Rating> ratings) { this.ratings = ratings; }

    public List<Review> getReviews() { return reviews; }
    public void setReviews(List<Review> reviews) { this.reviews = reviews; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<OrderItem> getOrderItems() { return orderItems; }
    public void setOrderItems(List<OrderItem> orderItems) { this.orderItems = orderItems; }
}
