package com.generation.ecomerce.service;

import com.generation.ecomerce.config.SecurityConfig;

import com.generation.ecomerce.model.Users;
import com.generation.ecomerce.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class UsersService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    public UsersService(UsersRepository usersRepository,PasswordEncoder passwordEncoder){
        this.usersRepository=usersRepository;
        this.passwordEncoder=passwordEncoder;
    }

    public List<Users> getAllUsers(){
        return usersRepository.findAll();
    }

    public Users getUserById(Long id){
        return usersRepository.findById(id).orElseThrow(
                ()-> new IllegalArgumentException("El usuario con el id " + id + " no se encuentra")
        );
    }
    public Users addUser(Users user){
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        return usersRepository.save(user);
    }

    public Users deleteUserById(Long id){
        Optional<Users> optionalUser = usersRepository.findById(id);
        if(optionalUser.isEmpty()) throw new IllegalArgumentException("El usuario con el id"  + id + " no se encuentra");
        usersRepository.deleteById(id);
        return optionalUser.get();
    }

    public Users updateUserById(Long id, Users userDetails){
        Optional<Users>optionalUser=usersRepository.findById(id);
        if(optionalUser.isEmpty())throw new IllegalArgumentException("El usuario con el id"  + id + " no se encuentra");
        Users user = optionalUser.get();
        if(userDetails.getName()!=null)user.setName(userDetails.getName());
        if(userDetails.getLastName()!=null)user.setLastName(userDetails.getLastName());
        if(userDetails.getEmail()!=null)user.setEmail(userDetails.getEmail());
        if(userDetails.getPassword()!=null){
            String hashedPassword = passwordEncoder.encode(userDetails.getPassword());
            user.setPassword(hashedPassword);
        };
        return usersRepository.save(user);
    }

}

















