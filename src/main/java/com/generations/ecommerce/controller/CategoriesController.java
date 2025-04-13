package com.generations.ecommerce.controller;

import com.generations.ecommerce.model.Categories;
import com.generations.ecommerce.service.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path="/api/categories/")
public class CategoriesController {
    private final CategoriesService categoriesService;

    @Autowired
    public CategoriesController(CategoriesService categoriesService){
        this.categoriesService = categoriesService;
    }

    @GetMapping //http://localhost:8080/api/categories/ con metodo get
    public List<Categories> getAllCategories(){
        return categoriesService.getAllCategories();
    }

    @GetMapping (path="{categoryId}") //http://localhost:8080/api/categories/ con metodo get
    public Categories getCategoryById(@PathVariable("categoryId")Long id){
        return categoriesService.getCategoryById(id);
    }
}
