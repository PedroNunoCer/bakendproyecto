package com.generation.ecomerce.model;

import  jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "detalles_compra") // Ajusta según el nombre real en BD
@Data
public class OrderDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    @ManyToOne
    @JoinColumn(name = "id_compra", nullable = false)
    private Orders order;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Products product;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
}
