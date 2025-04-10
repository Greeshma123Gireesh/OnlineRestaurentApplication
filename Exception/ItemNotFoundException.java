package com.Restaurent.RestaurentOnlineService.Exception;

public class ItemNotFoundException extends RuntimeException {
    private static final long serialVersionUID = 1L; // Add serialVersionUID

    public ItemNotFoundException(Long id) {
        super("Could not find item with ID " + id);
    }
}
