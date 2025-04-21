package com.generation.ecommerce.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name="products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Products {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_product", unique = true, nullable = false)
    private Long id_product;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name="price", nullable = false)
    private Double price;
    @Column(name="stock", nullable = false)
    private Long stock;
    @Lob
    @Column(name="image", columnDefinition = "BLOB", nullable = true)
    private byte[] image;
    @CreationTimestamp
    @Column(updatable = false, columnDefinition = "DATETIME(0)")
    private LocalDateTime date_creation;
    @UpdateTimestamp
    @Column(columnDefinition = "DATETIME(0)")
    private LocalDateTime date_update;
    @Column(name = "id_category")
    private Long id_category;
    @ManyToOne
    @JoinColumn(name = "id_category", referencedColumnName = "id_category", insertable = false, updatable = false)
    //@JsonIgnore
    private Categories category;
}
