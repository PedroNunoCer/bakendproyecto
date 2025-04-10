package com.generation.ecomerce.repository;

import com.generation.ecomerce.model.LoginAttempts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginAttemptsRepository extends JpaRepository<LoginAttempts,Long> {
}
