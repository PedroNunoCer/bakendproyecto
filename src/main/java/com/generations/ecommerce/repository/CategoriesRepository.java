package com.generations.ecommerce.repository;

import com.generations.ecommerce.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriesRepository extends JpaRepository<Categories,Long> {
}
