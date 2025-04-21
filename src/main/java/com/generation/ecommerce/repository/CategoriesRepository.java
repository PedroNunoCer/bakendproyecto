package com.generation.ecommerce.repository;

import com.generation.ecommerce.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Categories,Long> {
}
