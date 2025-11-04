package com.ecommerceshop.ecommerceshop.model;

import jakarta.persistence.Embeddable;

import java.util.Objects;

@Embeddable
public class Size {
    private String name;
    private int quantity;

    public Size() {
    }

    public Size(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Size)) return false;
        Size size = (Size) o;
        return Objects.equals(name, size.name)
                && quantity == size.quantity;  // 👈 include quantity
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, quantity); // 👈 include quantity
    }
}
