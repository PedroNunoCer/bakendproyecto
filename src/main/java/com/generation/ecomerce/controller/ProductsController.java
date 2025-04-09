package com.generation.ecomerce.controller;


import com.generation.ecomerce.model.Products;
import com.generation.ecomerce.service.ProductsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="/api/products/")
public class ProductsController {
    private final ProductsService productsService;
    @Autowired
    public ProductsController(ProductsService productsService){
        this.productsService = productsService;
    }
    @GetMapping
    public List<Products> getAllProducts(){
        return productsService.getAllProducts();
    }
    @GetMapping(path="{productId}")
    public Products getProductById(@PathVariable("productId")Long id){
        return productsService.getProductById(id);
    }
    @PostMapping
    public Products addProduct(@RequestBody Products product){
        return productsService.addProduct(product);
    }

    @DeleteMapping(path="{productId}")
    public Products deleteProductById(@PathVariable("productId")Long id){
        return productsService.deleteProductsById(id);

    }
    /*
    @PutMapping(path="{productId}")
    public Products updateProductById(@PathVariable("productId")Long id,@RequestBody Products product){
        return productsService.updateProducts(id,product);
    }*/
}
