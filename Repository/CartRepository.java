package com.Restaurent.RestaurentOnlineService.Repository;

import com.Restaurent.RestaurentOnlineService.Model.CartItem;
import com.Restaurent.RestaurentOnlineService.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<CartItem, Integer> {

    // Custom query method to find CartItems by User
    List<CartItem> findByUser(User user);
}
