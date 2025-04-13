package com.generations.ecommerce.service;

import com.generations.ecommerce.model.Categories;
import com.generations.ecommerce.model.Products;
import com.generations.ecommerce.repository.CategoriesRepository;
import com.generations.ecommerce.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {
    private final ProductsRepository productsRepository;
    private final CategoriesRepository categoriesRepository;
    @Autowired
    public ProductsService(ProductsRepository productsRepository, CategoriesRepository categoriesRepository){
        this.productsRepository = productsRepository;
        this.categoriesRepository = categoriesRepository;
    }

    public List<Products> getAllProducts(){
        return productsRepository.findAll();
    }

    public Products getProductById(Long id){
        return productsRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("EL producto con el " + id + " no existe")
        );
    }

    public Products deleteProductById(Long id){
        Products tmp = null;
        if(productsRepository.existsById(id)){
            tmp = productsRepository.findById(id).get();
            productsRepository.deleteById(id);
            return tmp;
        }
        return tmp;
    }

    //Si no existe un producto lo crea, si ya existe lo actualiza
    public Products addProduct(Products product){
        Categories categoryProduct = categoriesRepository.findById(product.getId_category())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
        product.setCategory(categoryProduct);
        return productsRepository.save(product);
    }

    public Products updateProduct(Long id, Products productDetails){ //product details es el producto a actualizar que recibimos del usuario
        Optional<Products> optionalProducts = productsRepository.findById(id);
        if(optionalProducts.isEmpty()) throw  new IllegalArgumentException("El producto con el "+ id + " no existe");
        Products product = optionalProducts.get(); //product es el producto que vamos a actualizar con los valores obtenidos de product details
        if(productDetails.getName() != null) product.setName(productDetails.getName());
        if(productDetails.getDescription() != null) product.setDescription(productDetails.getDescription());
        if(productDetails.getPrice() != null) product.setPrice(productDetails.getPrice());
        if(productDetails.getStock() != null) product.setStock(productDetails.getStock());
        if(productDetails.getImage() != null) product.setImage(productDetails.getImage());
        if(productDetails.getId_category()!= null) {
            Categories categoryProduct = categoriesRepository.findById(productDetails.getId_category())
                    .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
            product.setCategory(categoryProduct);
            product.setId_category(productDetails.getId_category());
        }
        return productsRepository.save(product);
    }
}
