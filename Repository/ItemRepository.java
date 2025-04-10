package com.Restaurent.RestaurentOnlineService.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.Restaurent.RestaurentOnlineService.Model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
	 List<Item> findByItemNameContainingIgnoreCase(String itemName);
	 List<Item> findByCategory(String category); 
}
