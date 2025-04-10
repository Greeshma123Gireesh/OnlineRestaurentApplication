package com.Restaurent.RestaurentOnlineService.Control;

import com.Restaurent.RestaurentOnlineService.Model.CartItem;
import com.Restaurent.RestaurentOnlineService.Model.Item;
import com.Restaurent.RestaurentOnlineService.Model.User;
import com.Restaurent.RestaurentOnlineService.Repository.CartRepository;
import com.Restaurent.RestaurentOnlineService.Repository.ItemRepository;
import com.Restaurent.RestaurentOnlineService.Repository.UserRepository;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    // Add an item to the cart
    @PostMapping("/add")
    @Transactional
    public ResponseEntity<?> addItemToCart(@RequestBody CartItem cartItem, @RequestHeader("User-Email") String userEmail) {
        try {
            // Check if the item exists
            Optional<Item> itemOptional = itemRepository.findById(cartItem.getItemId());
            if (!itemOptional.isPresent()) {
                System.out.println("Item not found with ID: " + cartItem.getItemId());
                return ResponseEntity.badRequest().body("Item not found with ID: " + cartItem.getItemId());
            }

            // Set item details in the cart item
            Item item = itemOptional.get();
            cartItem.setItemName(item.getItemName());
            cartItem.setItemPrice(item.getItemPrice());
            cartItem.setImageFileName(item.getImageFileName()); // Set the image file name

            // Debugging: Print item and image details
            System.out.println("Item Name: " + item.getItemName());
            System.out.println("Item Price: " + item.getItemPrice());
            System.out.println("Image file name: " + item.getImageFileName()); // Log the image file name

            // Check if the user exists
            User user = userRepository.findByEmail(userEmail);
            if (user == null) {
                System.out.println("User not found with email: " + userEmail);
                return ResponseEntity.badRequest().body("User not found with email: " + userEmail);
            }

            // Set the user for the cart item and save it
            cartItem.setUser(user);
            CartItem savedItem = cartRepository.save(cartItem);

            // Debugging: Log saved item details
            System.out.println("Saved cart item: " + savedItem.getItemName() + ", Image: " + savedItem.getImageFileName());

            return ResponseEntity.ok(savedItem);
        } catch (Exception e) {
            System.out.println("Error adding item to cart: " + e.getMessage());
            return ResponseEntity.status(500).body("Error adding item to cart: " + e.getMessage());
        }
    }

    // Get cart items for a specific user
    @GetMapping("/items/{email}")
    public ResponseEntity<?> getCartItems(@PathVariable String email) {
        try {
            // Fetch user based on email
            User user = userRepository.findByEmail(email);
            if (user == null) {
                System.out.println("User not found with email: " + email);
                return ResponseEntity.status(404).body("User not found with email: " + email);
            }

            // Fetch the cart items for the user
            List<CartItem> cartItems = cartRepository.findByUser(user);

            // Debugging: Log the cart items fetched
            System.out.println("Fetched cart items for user: " + email);
            for (CartItem cartItem : cartItems) {
                System.out.println("Cart Item: " + cartItem.getItemName() + ", Image: " + cartItem.getImageFileName());
            }

            return ResponseEntity.ok(cartItems);
        } catch (Exception e) {
            System.out.println("Error fetching cart items: " + e.getMessage());
            return ResponseEntity.status(500).body("Error fetching cart items: " + e.getMessage());
        }
    }

    // Remove an item from the cart
    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Integer id) {
        try {
            // Find the cart item by its ID
            Optional<CartItem> cartItem = cartRepository.findById(id);
            if (!cartItem.isPresent()) {
                System.out.println("Cart item not found with ID: " + id);
                return ResponseEntity.status(404).body("Cart item not found with ID: " + id);
            }

            // Remove the item from the cart
            cartRepository.deleteById(id);
            System.out.println("Removed cart item with ID: " + id);

            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.out.println("Error removing item from cart: " + e.getMessage());
            return ResponseEntity.status(500).body("Error removing item from cart: " + e.getMessage());
        }
    }
}
