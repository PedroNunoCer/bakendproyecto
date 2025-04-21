package com.generation.ecommerce.service;

import com.generation.ecommerce.model.Categories;
import com.generation.ecommerce.repository.CategoriesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriesService {
    private final CategoriesRepository categoriesRepository;
    @Autowired
    public CategoriesService(CategoriesRepository categoriesRepository){
        this.categoriesRepository = categoriesRepository;
    }

    public List<Categories> getAllCategories(){
        return categoriesRepository.findAll();
    }

    public Categories getCategoryById(Long id){
        return categoriesRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("Categoria con el " + id + " no existe")
        );
    }
}
