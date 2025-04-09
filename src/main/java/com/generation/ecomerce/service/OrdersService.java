package com.generation.ecomerce.service;

import com.generation.ecomerce.model.Orders;
import com.generation.ecomerce.repository.OrdersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrdersService {
    private final OrdersRepository ordersRepository;

    @Autowired
    public OrdersService(OrdersRepository ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }

    public Orders getOrderById(Long id) {
        return ordersRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("EL producto con el " + id + " no existe"));
    }

    public List<Orders> getOrdersByUser(Long userId) {
        return ordersRepository.findByUserId(userId);
    }

    public Orders createOrder(Orders orders) {
        orders.setOrderDate(LocalDateTime.now());
        orders.setOrderStatus(Orders.OrderStatus.PENDING);
        return ordersRepository.save(orders);
    }

    public Orders updateOrderStatus(Long id, Orders.OrderStatus newStatus) {
        Orders orders = getOrderById(id);
        orders.setOrderStatus(newStatus);
        return ordersRepository.save(orders);
    }

    public void deleteOrder(Long id) {
        if (!ordersRepository.existsById(id)) {
            throw new IllegalArgumentException("EL producto con el " + id + " no existe");
        }
        ordersRepository.deleteById(id);
    }
}
