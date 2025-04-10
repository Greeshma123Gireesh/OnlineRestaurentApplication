package com.Restaurent.RestaurentOnlineService.Repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.Restaurent.RestaurentOnlineService.Model.User;

public interface UserRepository extends JpaRepository<User, String> {
    User findByEmail(String email);
}
