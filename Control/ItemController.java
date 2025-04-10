package com.Restaurent.RestaurentOnlineService.Control;

import com.Restaurent.RestaurentOnlineService.Model.Item;

import com.Restaurent.RestaurentOnlineService.Repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")  // Allow cross-origin requests from your frontend
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    private static final String UPLOADED_FOLDER = "C:/Users/grees/Uploads/images/";

    // Add Item with Image Upload
    @PostMapping("/items")
    public ResponseEntity<Item> addItem(@RequestParam("itemName") String itemName,
                                        @RequestParam("itemPrice") double itemPrice,
                                        @RequestParam("description") String description,
                                        @RequestParam("category") String category, // Accept category
                                        @RequestParam("image") MultipartFile image) {
        try {
            String imageFileName = saveImage(image);
            Item item = new Item(itemName, itemPrice, description, category, imageFileName); // Include category
            Item savedItem = itemRepository.save(item);
            return ResponseEntity.ok(savedItem);
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    // Get all items
    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // Get an item by ID
    @GetMapping("/items/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable("id") int id) {
        Optional<Item> item = itemRepository.findById(id);
        return item.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an item
    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable("id") int id) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            try {
                Path imagePath = Paths.get(UPLOADED_FOLDER + item.getImageFileName());
                Files.deleteIfExists(imagePath);  // Delete image file from server
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
            itemRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Update an item
    @PutMapping("/items/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable("id") int id,
                                           @RequestParam("itemName") String itemName,
                                           @RequestParam("itemPrice") double itemPrice,
                                           @RequestParam("description") String description,
                                           @RequestParam("image") MultipartFile image) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            item.setItemName(itemName);
            item.setItemPrice(itemPrice);
            item.setDescription(description);
            try {
                item.setImageFileName(saveImage(image));  // Save new image
            } catch (IOException e) {
                e.printStackTrace();
            }
            Item updatedItem = itemRepository.save(item);
            return ResponseEntity.ok(updatedItem);
        }
        return ResponseEntity.notFound().build();
    }

    // Update the status of an item (Available/Not Available)
    @PutMapping("/items/{id}/status")
    public ResponseEntity<Item> updateItemStatus(@PathVariable("id") int id,
                                                 @RequestParam("status") String status) {
        Optional<Item> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            Item item = itemOptional.get();
            item.setStatus(status);  // Update status
            Item updatedItem = itemRepository.save(item);
            return ResponseEntity.ok(updatedItem);
        }
        return ResponseEntity.notFound().build();
    }

    // Save the image to disk
    private String saveImage(MultipartFile image) throws IOException {
        Path uploadPath = Paths.get(UPLOADED_FOLDER);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);  // Create directory if not exists
        }

        String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
        Path path = uploadPath.resolve(fileName);
        Files.copy(image.getInputStream(), path);  // Save image file
        return fileName;
    }

    // Serve image from the server
    @GetMapping("/images/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable("fileName") String fileName) {
        try {
            Path path = Paths.get(UPLOADED_FOLDER + fileName);
            byte[] imageBytes = Files.readAllBytes(path);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
 // Get items by category
    @GetMapping("/items/category/{category}")
    public List<Item> getItemsByCategory(@PathVariable("category") String category) {
        return itemRepository.findByCategory(category);
    }

    // Search items by name
//    @GetMapping("/items/search")
//    public List<Item> searchItems(@RequestParam("query") String query) {
//        return itemRepository.findByItemNameContainingIgnoreCase(query);  // Search functionality
//    }
}
