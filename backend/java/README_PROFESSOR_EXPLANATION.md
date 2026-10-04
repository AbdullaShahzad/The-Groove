# THE GROOVE ONLINE BOOKSTORE - ARCHITECTURE & JAVA DOCUMENTATION

This document provides a complete guide for presenting the **Java + JDBC + MySQL** backend and **React + Three.js** frontend architecture to your professor.

---

## 1. High-Level Architecture Overview

The system follows a classic **3-Tier Enterprise Architecture**:

1. **Presentation Layer (Frontend)**:
   - Built with **React** and **Three.js**.
   - Renders the interactive 12-volume Archival Canon shelf with real 3D leaning perspective, smooth transitions, and a Three.js WebGL 3D book inspection mode.
   - Provides cart management, order dispatch dialogs, and historical archive logs.

2. **Business Logic Layer (Java Services)**:
   - Located in `/backend/java/src/com/thegroove/service/`.
   - `VolumeService.java`: Handles business rules for category filtering, searching, and inventory threshold checks.
   - `OrderService.java`: Validates customer inputs, ensures inventory sufficiency, calculates authoritative line-item totals, generates canonical order IDs (e.g. `GRV-410531`), and coordinates ACID database transactions.

3. **Data Access Layer (JDBC DAOs & MySQL Database)**:
   - Located in `/backend/java/src/com/thegroove/dao/` and `/backend/sql/schema.sql`.
   - `DatabaseConnection.java`: Manages connection pooling and connection acquisition using `DriverManager.getConnection(...)` with `com.mysql.cj.jdbc.Driver`.
   - `VolumeDAO.java`: Uses parameterized `PreparedStatement` to run secure, injection-safe SQL queries against MySQL.
   - `OrderDAO.java`: Executes atomic multi-table transactions (`conn.setAutoCommit(false)`), batch updates to `order_items`, and inventory stock deductions with automated rollback on failure.

---

## 2. Key Java Classes & Functions for Your Professor

### A. Database Connection (`DatabaseConnection.java`)
- **Key Function**: `getConnection()`
- **Concept to explain**: "We use a static connection factory that loads the MySQL JDBC driver class `com.mysql.cj.jdbc.Driver` and connects via the standard connection string `jdbc:mysql://localhost:3306/the_groove_db`. It supports environment variables for deployment flexibility."

### B. Volume Data Access Object (`VolumeDAO.java`)
- **Key Functions**:
  - `findAll()`: Executes `SELECT * FROM volumes ORDER BY vol_num ASC` and maps `ResultSet` rows into `Volume` model POJOs.
  - `findByCategory(String category)`: Uses a parameterized query (`WHERE category = ?`) to safely retrieve volumes.
  - `search(String query)`: Implements SQL `LIKE` wildcard search across title and author.
  - `updateStock(String id, int quantityChange)`: Atomically updates the stock count.

### C. Order Transaction Data Access Object (`OrderDAO.java`)
- **Key Function**: `createOrder(Order order)`
- **Concept to explain (ACID Transaction)**:
  1. `conn.setAutoCommit(false)` starts the transaction.
  2. Inserts the main record into the `orders` table.
  3. Uses `PreparedStatement.addBatch()` and `executeBatch()` to insert all ordered items into `order_items`.
  4. Deducts volume stock inside the same transaction.
  5. If all operations succeed, `conn.commit()` commits the transaction. If any `SQLException` occurs, `conn.rollback()` restores the database state, preventing orphaned records.

---

## 3. MySQL Relational Schema (`/backend/sql/schema.sql`)

- **`volumes` Table**: Stores the 12 canonical editions (`id`, `vol_num`, `title`, `author`, `price`, `category`, `spine_color`, `isbn`, `stock_count`, `binding_specs`).
- **`orders` Table**: Master table recording dispatches (`order_id`, `recipient_name`, `recipient_email`, `total_amount`, `status`).
- **`order_items` Table**: Relational bridge recording each volume purchased, unit price, and quantity with a Foreign Key referencing `orders(order_id)`.

---

## 4. Frontend & 3D WebGL (React + Three.js)

- **`ThreeBookCanvas.tsx`**: Uses Three.js `WebGLRenderer`, `PerspectiveCamera`, `BoxGeometry`, custom canvas textures for cloth stamping and foil reflection, and mouse drag orbit controls.
- **`SpineShelf.tsx` & `GrooveSpine.tsx`**: Renders all 12 leaning books at a natural 6.5° tilt with top page curves, gold foiled star medallions, and bottom volume price plaques, with smooth category dimming and zero layout shifting.
