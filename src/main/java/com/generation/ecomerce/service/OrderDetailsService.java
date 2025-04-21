package com.generation.ecomerce.service;

import com.generation.ecomerce.model.OrderDetails;
import com.generation.ecomerce.repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderDetailsService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    // Obtener todos los detalles de compras
    public List<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    // Obtener un detalle por su ID
    public Optional<OrderDetails> getOrderDetailById(Long id) {
        return orderDetailsRepository.findById(id);
    }

    // Guardar un nuevo detalle de compra
    public OrderDetails saveOrderDetail(OrderDetails orderDetail) {
        return orderDetailsRepository.save(orderDetail);
    }

    // Eliminar un detalle de compra por su ID
    public void deleteOrderDetail(Long id) {
        orderDetailsRepository.deleteById(id);
    }

    // Actualizar un detalle de compra
    public OrderDetails updateOrderDetail(Long id, OrderDetails updatedDetail) {
        return orderDetailsRepository.findById(id)
                .map(existingDetail -> {
                    existingDetail.setOrderId(updatedDetail.getOrderId());
                    existingDetail.setProductId(updatedDetail.getProductId());
                    existingDetail.setQuantity(updatedDetail.getQuantity());
                    return orderDetailsRepository.save(existingDetail);
                })
                .orElse(null);
    }
}
