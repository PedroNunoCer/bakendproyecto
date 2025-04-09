package com.generation.ecomerce.service;

import com.generation.ecomerce.model.Products;
import com.generation.ecomerce.repository.ProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductsService {
    private final ProductsRepository productsRepository;
    @Autowired
    public ProductsService(ProductsRepository productsRepository){
        this.productsRepository=productsRepository;
    }
    public List<Products> getAllProducts(){
        return productsRepository.findAll();
    }
    public Products getProductById(Long id){
        return productsRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("EL producto con el " + id + " no existe")
        );
    }

    public Products deleteProductsById(Long id){
        Products tmp=null;
        if(productsRepository.existsById(id)){
            tmp=productsRepository.findById(id).get();
            productsRepository.deleteById(id);
            return tmp;
        }
        return tmp;
    }

    public Products addProduct(Products product){
        return productsRepository.save(product);

    }
/*
    public Products updateProducts(Long id, Products productDetails){ //producto a actualizar recibido del usr
        Optional<Products> optionalProduct=productsRepository.findById(id);
        if(optionalProduct.isEmpty()) throw new IllegalArgumentException("EL producto con el" + id + " no existe");
        Products product = optionalProduct.get(); //producto a actulizar
        if(productDetails.getName()!=null)product.setName(productDetails.getName());
        if(productDetails.getDescripcion()!=null) product.setDescripcion(productDetails.getDescripcion());
        if(productDetails.getQuantity()!=null)product.setQuantity(productDetails.getQuantity());
        return productsRepository.save(product);
    }
*/

}
