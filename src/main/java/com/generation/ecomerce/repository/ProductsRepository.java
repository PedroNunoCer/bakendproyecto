package com.generation.ecomerce.repository;

import com.generation.ecomerce.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products,Long> {
}
