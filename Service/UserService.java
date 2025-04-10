package com.Restaurent.RestaurentOnlineService.Service;
import com.Restaurent.RestaurentOnlineService.Model.User;
import com.Restaurent.RestaurentOnlineService.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public User saveUser(User user) {
        try {
            return userRepository.save(user);
        } catch (OptimisticLockingFailureException e) {
            // Handle optimistic locking failure
            System.out.println("Optimistic locking failure: " + e.getMessage());
            // You can either retry the operation or throw a custom exception
            throw new RuntimeException("Concurrent update detected, please try again.");
        }
    }
}
