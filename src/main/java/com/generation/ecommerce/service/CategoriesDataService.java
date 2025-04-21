package com.generation.ecommerce.service;

import com.generation.ecommerce.model.Categories;
import com.generation.ecommerce.repository.CategoriesRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoriesDataService {
    @Autowired
    private CategoriesRepository categoriesRepository;

    @PostConstruct
    public void init() {
        // Verifica si las categorías ya existen para evitar duplicados
        if (categoriesRepository.count() == 0) {
            List<Categories> categories = new ArrayList<>();

            Categories fresco = new Categories();
            fresco.setCategory("Fresco");
            fresco.setDescription("Productos frescos");

            Categories oreado = new Categories();
            oreado.setCategory("Oreado");
            oreado.setDescription("Productos oreados");

            Categories seco = new Categories();
            seco.setCategory("Seco");
            seco.setDescription("Productos secos");

            categories.add(fresco);
            categories.add(oreado);
            categories.add(seco);

            categoriesRepository.saveAll(categories);

            //Categorías inicializadas
        }
    }
}
