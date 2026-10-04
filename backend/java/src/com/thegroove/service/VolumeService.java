package com.thegroove.service;

import com.thegroove.dao.VolumeDAO;
import com.thegroove.model.Volume;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Business Service handling volume catalog operations, filtering, and search.
 * Can be presented to your professor as the core Business Logic Layer.
 */
public class VolumeService {

    private final VolumeDAO volumeDAO;

    public VolumeService() {
        this.volumeDAO = new VolumeDAO();
    }

    public VolumeService(VolumeDAO volumeDAO) {
        this.volumeDAO = volumeDAO;
    }

    /**
     * Retrieves the complete 12-volume Archival Canon.
     * @return List of all preserved volumes
     */
    public List<Volume> getAllVolumes() {
        return volumeDAO.findAll();
    }

    /**
     * Filters volumes by canonical category (e.g. "FICTION", "THRILLER", "CLASSICS").
     * @param category The category name to filter by
     * @return Filtered list of volumes
     */
    public List<Volume> getVolumesByCategory(String category) {
        if (category == null || category.equalsIgnoreCase("ALL VOLUMES")) {
            return getAllVolumes();
        }
        return volumeDAO.findByCategory(category);
    }

    /**
     * Searches volumes by keyword across title, author, and description.
     * @param query Search keyword
     * @return Matching volumes
     */
    public List<Volume> searchVolumes(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllVolumes();
        }
        return volumeDAO.search(query.trim());
    }

    /**
     * Inspects a specific volume by its primary identifier.
     * @param id Volume ID (e.g. "vol-01")
     * @return Optional containing the Volume if found
     */
    public Optional<Volume> getVolumeById(String id) {
        return Optional.ofNullable(volumeDAO.findById(id));
    }

    /**
     * Verifies if requested quantity of a book is available in stock.
     * @param id Volume ID
     * @param requestedQty Number of copies requested
     * @return true if stock is sufficient
     */
    public boolean checkInventoryAvailability(String id, int requestedQty) {
        Volume volume = volumeDAO.findById(id);
        return volume != null && volume.getStockCount() >= requestedQty;
    }
}
