package com.generations.ecommerce.repository;

import com.generations.ecommerce.model.Products;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductsRepository extends JpaRepository<Products,Long> {

}
