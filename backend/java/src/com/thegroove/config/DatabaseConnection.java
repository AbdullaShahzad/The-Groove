package com.thegroove.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 * Singleton / Utility class managing JDBC Connection to MySQL database.
 * Supports configurable environment variables or standard defaults.
 */
public class DatabaseConnection {

    private static final Logger LOGGER = Logger.getLogger(DatabaseConnection.class.getName());

    // MySQL connection settings with environment overrides
    private static final String DEFAULT_HOST = System.getenv().getOrDefault("MYSQL_HOST", "localhost");
    private static final String DEFAULT_PORT = System.getenv().getOrDefault("MYSQL_PORT", "3306");
    private static final String DEFAULT_DB = System.getenv().getOrDefault("MYSQL_DATABASE", "the_groove_db");
    
    private static final String URL = System.getenv().getOrDefault(
        "DB_URL", 
        "jdbc:mysql://" + DEFAULT_HOST + ":" + DEFAULT_PORT + "/" + DEFAULT_DB + 
        "?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC&characterEncoding=UTF-8"
    );
    
    private static final String USER = System.getenv().getOrDefault("DB_USER", "root");
    private static final String PASSWORD = System.getenv().getOrDefault("DB_PASSWORD", "password");

    // Static initializer to load the MySQL Driver class
    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            LOGGER.info("MySQL JDBC Driver registered successfully.");
        } catch (ClassNotFoundException e) {
            LOGGER.log(Level.SEVERE, "MySQL JDBC Driver not found in classpath. Ensure mysql-connector-j is included.", e);
        }
    }

    /**
     * Obtains a fresh JDBC Connection instance.
     * @return Connection to MySQL database
     * @throws SQLException if a database access error occurs
     */
    public static Connection getConnection() throws SQLException {
        try {
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException e) {
            LOGGER.log(Level.SEVERE, "Failed to connect to MySQL database at: " + URL, e);
            throw e;
        }
    }

    /**
     * Safely closes a JDBC connection.
     * @param connection the Connection to close
     */
    public static void closeConnection(Connection connection) {
        if (connection != null) {
            try {
                connection.close();
            } catch (SQLException e) {
                LOGGER.log(Level.WARNING, "Error closing database connection", e);
            }
        }
    }

    public static String getJdbcUrl() {
        return URL;
    }

    public static String getDbUser() {
        return USER;
    }
}
