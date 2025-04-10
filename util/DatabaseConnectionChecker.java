//package com.Restaurent.RestaurentOnlineService.util;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.jdbc.core.JdbcTemplate;
//
//import java.sql.Connection;
//import java.sql.SQLException;
//
//@SpringBootApplication
//public class DatabaseConnectionChecker implements CommandLineRunner {
//
//    @Autowired
//    private JdbcTemplate jdbcTemplate;
//
////    public static void main(String[] args) {
////        SpringApplication.run(DatabaseConnectionChecker.class, args);
////    }
//
//    @Override
//    public void run(String... args) throws Exception {
//        checkDatabaseConnection();
//    }
//
//    public void checkDatabaseConnection() {
//        try (Connection connection = jdbcTemplate.getDataSource().getConnection()) {
//            if (connection != null) {
//                System.out.println("Database connection is successful!");
//            } else {
//                System.out.println("Database connection failed: No connection object.");
//            }
//        } catch (SQLException e) {
//            System.out.println("Failed to connect to the database: " + e.getMessage());
//        }
//    }
//}
package com.Restaurent.RestaurentOnlineService.util;


