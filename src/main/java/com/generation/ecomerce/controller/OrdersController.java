package com.generation.ecomerce.controller;

import com.generation.ecomerce.model.Orders;
import com.generation.ecomerce.service.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api/orders")

public class OrdersController {
    private final OrdersService ordersService;

    @Autowired
    public OrdersController(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @GetMapping
    public List<Orders> getAllOrders() {
        return ordersService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Orders getOrderById(@PathVariable Long id) {
        return ordersService.getOrderById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Orders> getOrdersByUser(@PathVariable Long userId) {
        return ordersService.getOrdersByUser(userId);
    }

    @PostMapping
    public Orders createOrder(@RequestBody Orders orders) {
        return ordersService.createOrder(orders);
    }

    @PutMapping("/{id}/status")
    public Orders updateOrderStatus(
            @PathVariable Long id,
            @RequestParam Orders.OrderStatus status) {
        return ordersService.updateOrderStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        ordersService.deleteOrder(id);
    }
}
