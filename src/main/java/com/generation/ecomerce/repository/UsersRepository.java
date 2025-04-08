package com.generation.ecomerce.repository;

import com.generation.ecomerce.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users,Long> {
}
