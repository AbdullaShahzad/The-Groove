package com.thegroove.dao;

import com.thegroove.config.DatabaseConnection;
import com.thegroove.model.Volume;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * JDBC Data Access Object (DAO) for Volumes (Books) in MySQL.
 */
public class VolumeDAO {

    private static final Logger LOGGER = Logger.getLogger(VolumeDAO.class.getName());

    /**
     * Retrieves all 12 canonical volumes ordered by vol_num.
     */
    public List<Volume> findAll() {
        List<Volume> list = new ArrayList<>();
        String sql = "SELECT * FROM volumes ORDER BY vol_num ASC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                list.add(mapResultSetToVolume(rs));
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "JDBC Error in findAll volumes", e);
        }
        return list;
    }

    /**
     * Finds a volume by primary key (id).
     */
    public Volume findById(String id) {
        String sql = "SELECT * FROM volumes WHERE id = ?";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, id);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return mapResultSetToVolume(rs);
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "JDBC Error finding volume by id: " + id, e);
        }
        return null;
    }

    /**
     * Finds volumes by department category.
     */
    public List<Volume> findByCategory(String category) {
        List<Volume> list = new ArrayList<>();
        String sql = "SELECT * FROM volumes WHERE category = ? ORDER BY vol_num ASC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, category);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapResultSetToVolume(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "JDBC Error finding volumes by category: " + category, e);
        }
        return list;
    }

    /**
     * Searches volumes by title or author keyword.
     */
    public List<Volume> search(String query) {
        List<Volume> list = new ArrayList<>();
        String sql = "SELECT * FROM volumes WHERE LOWER(title) LIKE ? OR LOWER(author) LIKE ? ORDER BY vol_num ASC";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            String pattern = "%" + query.toLowerCase() + "%";
            stmt.setString(1, pattern);
            stmt.setString(2, pattern);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    list.add(mapResultSetToVolume(rs));
                }
            }
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "JDBC Error searching volumes with query: " + query, e);
        }
        return list;
    }

    /**
     * Updates inventory stock count for an edition.
     */
    public boolean updateStock(String id, int quantityChange) {
        String sql = "UPDATE volumes SET stock_count = stock_count + ? WHERE id = ? AND stock_count + ? >= 0";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, quantityChange);
            stmt.setString(2, id);
            stmt.setInt(3, quantityChange);

            return stmt.executeUpdate() > 0;
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "JDBC Error updating stock for volume: " + id, e);
            return false;
        }
    }

    private Volume mapResultSetToVolume(ResultSet rs) throws SQLException {
        return new Volume(
            rs.getString("id"),
            rs.getInt("vol_num"),
            rs.getString("vol_string"),
            rs.getString("title"),
            rs.getString("author"),
            rs.getBigDecimal("price"),
            rs.getString("category"),
            rs.getString("spine_color"),
            rs.getString("accent_color"),
            rs.getString("foil_color"),
            rs.getInt("published_year"),
            rs.getString("isbn"),
            rs.getInt("stock_count"),
            rs.getString("synopsis"),
            rs.getString("cloth_description"),
            rs.getString("binding_format"),
            rs.getString("paper_stock")
        );
    }
}
