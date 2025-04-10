package com.generation.ecomerce.repository;

import com.generation.ecomerce.model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails,Long> {
}
