package com.Restaurent.RestaurentOnlineService.Config; // Adjust the package path as needed

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // This allows your React frontend (running on localhost:3000) to access the backend API (running on localhost:8080)
        registry.addMapping("/api/**") // Apply to all endpoints starting with /api/
                .allowedOrigins("http://localhost:3000") // Your React frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specific HTTP methods
                .allowCredentials(true); // Allow credentials (cookies, authorization headers)
    }
}
