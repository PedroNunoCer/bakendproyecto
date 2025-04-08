package com.generation.ecomerce.model;

import jakarta.persistence.*;

@Entity
@Table(name="products")
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id",nullable = false,unique = true)
    private Long id;
    @Column(name="name",nullable = false)
    private String name;
    @Column(nullable = false)
    private String descripcion;
    @Column(nullable = false)
    private Integer quantity;

    public Products(Long id, String name, String descripcion, Integer quantity) {
        this.id = id;
        this.name = name;
        this.descripcion = descripcion;
        this.quantity = quantity;
    }

    public Products() {
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
