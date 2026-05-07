package com.AuthForm.Service;

import com.AuthForm.Entites.User;
import com.AuthForm.Repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private userRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // 1. Fetch YOUR entity from PostgreSQL
        // (Ensure 'User' here is imported from your .entity package)
        User myUser = (User) userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        // 2. Return SPRING SECURITY'S User object using the full path
        return org.springframework.security.core.userdetails.User
                .withUsername(myUser.getEmail()) // use email as username
                .password(myUser.getPassword())
                .authorities("USER")
                .build();
    }

}
