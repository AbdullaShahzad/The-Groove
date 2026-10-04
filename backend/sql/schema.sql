-- ====================================================================
-- THE GROOVE - ONLINE BOOKSTORE DATABASE SCHEMA
-- Database: the_groove_db
-- Engine: InnoDB, UTF-8 MB4
-- ====================================================================

CREATE DATABASE IF NOT EXISTS the_groove_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE the_groove_db;

-- --------------------------------------------------------------------
-- Table: volumes (Archival Canon Books)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS volumes;

CREATE TABLE volumes (
    id VARCHAR(32) PRIMARY KEY,
    vol_num INT NOT NULL UNIQUE,
    vol_string VARCHAR(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(64) NOT NULL,
    spine_color VARCHAR(16) NOT NULL,
    accent_color VARCHAR(16) NOT NULL,
    foil_color VARCHAR(16) NOT NULL,
    published_year INT NOT NULL,
    isbn VARCHAR(32) NOT NULL UNIQUE,
    stock_count INT NOT NULL DEFAULT 0,
    synopsis TEXT NOT NULL,
    cloth_description TEXT NOT NULL,
    binding_format VARCHAR(64) NOT NULL,
    paper_stock VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_title (title)
) ENGINE=InnoDB;

-- --------------------------------------------------------------------
-- Table: orders (Historical Dispatch Log)
-- --------------------------------------------------------------------
CREATE TABLE orders (
    order_id VARCHAR(32) PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('CONFIRMED', 'DISPATCHED', 'DELIVERED') DEFAULT 'CONFIRMED',
    recipient_name VARCHAR(255) NOT NULL,
    recipient_email VARCHAR(255) NOT NULL,
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(128) NOT NULL,
    postal_code VARCHAR(32) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- --------------------------------------------------------------------
-- Table: order_items (Archival Items in each order)
-- --------------------------------------------------------------------
CREATE TABLE order_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(32) NOT NULL,
    volume_id VARCHAR(32) NOT NULL,
    vol_string VARCHAR(16) NOT NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (volume_id) REFERENCES volumes(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- --------------------------------------------------------------------
-- Seed Data: The 12 Canonical Volumes
-- --------------------------------------------------------------------
INSERT INTO volumes (
    id, vol_num, vol_string, title, author, price, category, 
    spine_color, accent_color, foil_color, published_year, isbn, 
    stock_count, synopsis, cloth_description, binding_format, paper_stock
) VALUES
('vol-01', 1, 'VOL. 01', 'THE GREAT GATSBY', 'F. Scott Fitzgerald', 28.00, 'CLASSICS', 
 '#1A293E', '#D4AF37', '#E2C26E', 1925, '978-0743273565', 18, 
 'F. Scott Fitzgerald’s third novel stands as the supreme triumph of his career. The story of the fabulously wealthy Jay Gatsby and his new love for Daisy Buchanan is an exquisitely crafted tale of America in the 1920s.',
 'Midnight blue buckram cloth with celestial 24kt gold foil stamping and gilded top edge.', 'CROWN OCTAVO', '120GSM ARCHIVAL WOVE'),

('vol-02', 2, 'VOL. 02', '1984', 'George Orwell', 24.00, 'FICTION', 
 '#6B1D2F', '#E5A93C', '#F0C767', 1949, '978-0451524935', 22, 
 'Winston Smith toes the Party line, rewriting history to satisfy the Ministry of Truth. With each lie he writes, Winston grows to hate the Party that seeks power for its own sake.',
 'Industrial crimson linen with cold-stamped black foil rules and surveillance eye blind deboss.', 'STANDARD FOOLSCAP', 'SWEDISH ROUGH UNBLEACHED'),

('vol-03', 3, 'VOL. 03', 'DORIAN GRAY', 'Oscar Wilde', 26.00, 'CLASSICS', 
 '#184733', '#D8B153', '#ECD188', 1890, '978-0141439570', 15, 
 'Oscar Wilde’s story of a fashionable young man who sells his soul for eternal youth and beauty remains as provocative and scandalous today as it was when first published.',
 'Decadent hunter green velvet-grain bookcloth with gilded floral cartouche and silk marker ribbon.', 'IMPERIAL OCTAVO', '140GSM VELLUM LAID'),

('vol-04', 4, 'VOL. 04', 'PRIDE & PREJUDICE', 'Jane Austen', 22.00, 'CLASSICS', 
 '#3A4B45', '#DEC177', '#F4DD9A', 1813, '978-0141439518', 34, 
 'Few have failed to be charmed by the witty and independent spirit of Elizabeth Bennet in Austen’s beloved masterpiece of romantic clash, social folly, and enduring affection.',
 'Regency sage cotton weave with blind debossed Regency filigree and copper foil lettering.', 'POCKET DUODECIMO', '110GSM COTTON RAG'),

('vol-05', 5, 'VOL. 05', 'FRANKENSTEIN', 'Mary Shelley', 25.00, 'CLASSICS', 
 '#96681E', '#F2D382', '#F7E2A9', 1818, '978-0141439471', 19, 
 'Mary Shelley’s chilling gothic tale of a scientist obsessed with creating life and the lonely, vengeful creature he abandons to an unforgiving world.',
 'Ochre buckram cloth with galvanic lightning blind impressions and hand-sewn black headbands.', 'MEDIUM OCTAVO', '130GSM RUSTIC ANTIQUE'),

('vol-06', 6, 'VOL. 06', 'THE HOBBIT', 'J.R.R. Tolkien', 32.00, 'FICTION', 
 '#123D2D', '#DDB354', '#EFCD7A', 1937, '978-0547928227', 28, 
 'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling further than his pantry in Bag End. But his contentment is disturbed when Gandalf arrives with thirteen dwarves.',
 'Deep moss library buckram embossed with Tolkien’s runic dragon glyph in lustrous green-gold foil.', 'ROYAL OCTAVO', '135GSM MAP-GRADE HEAVY'),

('vol-07', 7, 'VOL. 07', 'CATCHER IN THE RYE', 'J.D. Salinger', 21.00, 'FICTION', 
 '#6B1B26', '#D7AE52', '#ECD188', 1951, '978-0316769488', 16, 
 'Holden Caulfield’s unforgettable journey through Manhattan after being expelled from prep school remains the definitive American portrait of alienation and vulnerability.',
 'Crimson cardinal cloth with minimalist debossed gold title and unvarnished raw edge spine.', 'STANDARD TRADE', '115GSM NATURAL WOVE'),

('vol-08', 8, 'VOL. 08', 'THE LITTLE PRINCE', 'Antoine de Saint-Exupéry', 20.00, 'PHILOSOPHY', 
 '#1D2A44', '#E6C068', '#F4D994', 1943, '978-0156012195', 40, 
 'A pilot stranded in the desert meets an enigmatic little prince from asteroid B-612. A transcendent poetic fable that reminds adults what it truly means to see with the heart.',
 'Starlit deep indigo cloth featuring asteroid constellation blind debossing and gold star foil.', 'SQUARE FOLIO', '150GSM FRENCH ARCHIVAL'),

('vol-09', 9, 'VOL. 09', 'THE BOYFRIEND', 'Freida McFadden', 27.00, 'THRILLER', 
 '#4A141E', '#D8AE52', '#ECD188', 2024, '978-1728296210', 30, 
 'The explosive psychological thriller from Freida McFadden. Sydney feels she has finally met the perfect partner in handsome Dr. Tom Martinez, until dead women from a dating app begin surfacing across Manhattan.',
 'Modern noir cloth edition with blood-burgundy thread binding and razor-sharp typographic foil.', 'TRADE FOLIO', 'SMOOTH HIGH-BULK'),

('vol-10', 10, 'VOL. 10', 'THE MOUNTAIN IS YOU', 'Brianna Wiest', 23.00, 'MENTAL HEALTH', 
 '#2D3B48', '#D6AF55', '#EACD85', 2020, '978-1949759228', 25, 
 'A book about self-sabotage. Why we do it, when we do it, and how to stop doing it—for good. By learning to step out of your own way, you can scale the internal mountain to your true self.',
 'Basalt slate cloth with topographical contours blind debossed along the front cover and spine.', 'DEMI OCTAVO', '125GSM TEXTURED MATTE'),

('vol-11', 11, 'VOL. 11', 'THE PSYCHOLOGY OF MONEY', 'Morgan Housel', 25.00, 'MONEY & MIND', 
 '#173E2E', '#D4AF37', '#E8CA73', 2020, '978-0857197689', 24, 
 'Morgan Housel explores 19 short stories on the strange ways people think about money. Financial success is not a hard science, but a soft skill where behavior trumps raw intelligence.',
 'Deep spruce archival cloth with emerald endpapers and matte bronze coin insignia.', 'ROYAL OCTAVO', '340GSM LAID'),

('vol-12', 12, 'VOL. 12', 'MAYBE YOU SHOULD TALK TO SOMEONE', 'Lori Gottlieb', 24.00, 'MENTAL HEALTH', 
 '#783A1B', '#E5BE64', '#F5DC94', 2019, '978-1328662057', 20, 
 'A therapist, her therapist, and our lives revealed. Lori Gottlieb takes us behind the scenes of her therapy practice and reveals her own struggles, offering a deeply human, funny, and wise look at our inner lives.',
 'Cognac heritage cloth with warm gold serif type and hand-tipped marbled endpapers.', 'LARGE CROWN', '120GSM CREAM BULK');

-- Initial Order Seed
INSERT INTO orders (order_id, order_date, status, recipient_name, recipient_email, street_address, city, postal_code, total_amount)
VALUES ('GRV-410531', '2026-09-16 14:30:00', 'CONFIRMED', 'Shahzad', 'eleanor@archival.org', '452 Lexington Avenue, Apt 8B', 'New York', '10017', 22.00);

INSERT INTO order_items (order_id, volume_id, vol_string, title, author, unit_price, quantity)
VALUES ('GRV-410531', 'vol-04', 'VOL. 04', 'PRIDE & PREJUDICE', 'Jane Austen', 22.00, 1);
