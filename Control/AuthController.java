package com.Restaurent.RestaurentOnlineService.Control;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.Restaurent.RestaurentOnlineService.Model.User;
import com.Restaurent.RestaurentOnlineService.Repository.UserRepository;
import com.Restaurent.RestaurentOnlineService.Service.UserService;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        if (userRepository.existsById(user.getEmail())) {
            return "User already exists";
        }
        try {
            userService.saveUser(user);
            return "Signup successful";
        } catch (RuntimeException e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/login")
    public Object login(@RequestBody User user) {
        User foundUser = userRepository.findByEmail(user.getEmail());
        if (foundUser != null && foundUser.getPassword().equals(user.getPassword())) {
            // Generate a token (this can be done with JWT or other token services)
            String token = "sample-token"; // Use a real token generator here
            
            // Print user details to the Eclipse terminal
            System.out.println("User logged in successfully:");
            System.out.println("Email: " + foundUser.getEmail());
            System.out.println("Name: " + foundUser.getName());
            System.out.println("Mobile: " + foundUser.getMobile());
            
            return new LoginResponse("Login successful", token);
        }
        
        // Print an invalid login attempt
        System.out.println("Invalid login attempt for email: " + user.getEmail());
        return new ErrorResponse("Invalid credentials");
    }


    @PutMapping("/update")
    public String updateUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setMobile(user.getMobile());
            userRepository.save(existingUser);
            return "User updated successfully";
        }
        return "User not found";
    }

    // Response classes for better structured responses
    public static class LoginResponse {
        private String message;
        private String token;

        public LoginResponse(String message, String token) {
            this.message = message;
            this.token = token;
        }

        public String getMessage() {
            return message;
        }

        public String getToken() {
            return token;
        }
    }

    public static class ErrorResponse {
        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
