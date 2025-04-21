package com.generation.ecomerce.controller;

import com.generation.ecomerce.model.OrderDetails;
import com.generation.ecomerce.service.OrderDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/order-details")
@CrossOrigin(origins = "*") // Puedes ajustar esto según tu frontend
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;

    // GET: Obtener todos los detalles
    @GetMapping
    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsService.getAllOrderDetails();
    }

    // GET: Obtener detalle por ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderDetails> getOrderDetailById(@PathVariable Long id) {
        Optional<OrderDetails> detail = orderDetailsService.getOrderDetailById(id);
        return detail.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST: Crear un nuevo detalle de compra
    @PostMapping
    public ResponseEntity<OrderDetails> createOrderDetail(@RequestBody OrderDetails detail) {
        OrderDetails savedDetail = orderDetailsService.saveOrderDetail(detail);
        return ResponseEntity.ok(savedDetail);
    }

    // PUT: Actualizar un detalle de compra existente
    @PutMapping("/{id}")
    public ResponseEntity<OrderDetails> updateOrderDetail(@PathVariable Long id, @RequestBody OrderDetails detail) {
        OrderDetails updated = orderDetailsService.updateOrderDetail(id, detail);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE: Eliminar un detalle de compra por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrderDetail(@PathVariable Long id) {
        orderDetailsService.deleteOrderDetail(id);
        return ResponseEntity.noContent().build();
    }
}
