package com.AuthForm.Service;


import com.AuthForm.Entites.User;
import com.AuthForm.Repo.userRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class userService {

    @Autowired
    private userRepo userRepo;



    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Username already exists!");
        }
        // Hash the password before it touches the database
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

    public String loginUser(String username, String password) {
        User user = (User)userRepo.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(password, user.getPassword())) {
            return "Login successful!";
        } else {
            throw new RuntimeException("Invalid password");
        }
    }

}















