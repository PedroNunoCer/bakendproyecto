package com.generation.ecommerce.repository;

import com.generation.ecommerce.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products,Long> {

}
