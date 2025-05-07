-- DROP TABLES IF EXIST
DROP TABLE IF EXISTS payments, booking_details, bookings, hotel_amenities, rooms, hotel_rooms, amenities, hotels,
    room_types, provinces, users, roles, reviews;


-- USERS TABLE (Many-to-One: Many users belong to one role)
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       username VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                        phone_number VARCHAR(255) NOT NULL,
                       first_name VARCHAR(255) NOT NULL,
                       last_name VARCHAR(255) NOT NULL,
                       role_id INT NOT NULL,  -- Foreign key to roles
);

-- PROVINCES TABLE (One-to-Many: One province has many hotels)
CREATE TABLE provinces (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           description TEXT  -- Additional details about the province (optional)
);

-- HOTELS TABLE (Many-to-One: Many hotels belong to one province)
CREATE TABLE hotels (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        province_id INT NOT NULL,
                        description TEXT,  -- Description of the hotel (e.g., 5-star, beachfront)
                        FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE
);

-- ROOM TYPES TABLE (Independent table for room classification)
CREATE TABLE rooms (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            description TEXT  -- Details about the room type (e.g., "Deluxe room with ocean view")
);

-- HOTEL ROOMS TABLE (Many-to-Many: A hotel can have many room types, and a room type can belong to many hotels)
CREATE TABLE hotel_rooms (
                             hotel_id INT NOT NULL,
                             room_id INT NOT NULL,
                            price INT NOT NULL CHECK (price >= 0),
                             number_rooms INT NOT NULL CHECK (number_rooms >= 0),
                             PRIMARY KEY (hotel_id, room_id),
                             FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
                             FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);


-- AMENITIES TABLE (Independent table for amenities)
CREATE TABLE amenities (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           description TEXT  -- Additional details about the amenity
);

-- HOTEL AMENITIES TABLE (Many-to-Many: A hotel can have many amenities, and an amenity can belong to many hotels)
CREATE TABLE hotel_amenities (
                                 hotel_id INT NOT NULL,
                                 amenity_id INT NOT NULL,
                                 PRIMARY KEY (hotel_id, amenity_id),
                                 FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
                                 FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

-- BOOKINGS TABLE (One-to-Many: A user can have many bookings)
CREATE TABLE bookings (
                          id SERIAL PRIMARY KEY,
                          user_id INT NOT NULL,
                          hotel_id INT NOT NULL,
                          checkin_date DATE NOT NULL,
                          checkout_date DATE NOT NULL,
                          total_fare INT NOT NULL CHECK (total_fare >= 0),
                          booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          status_payment VARCHAR(50) DEFAULT 'pending',  -- pending, paid, cancelled
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                          FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);


-- REVIEWS TABLE (One-to-Many: A user can write multiple reviews)
CREATE TABLE reviews (
                         id SERIAL PRIMARY KEY,
                         user_id INT NOT NULL,
                         hotel_id INT NOT NULL,
                         rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                         title VARCHAR(255), -- Short title for the review
                         comment TEXT,
                         review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);


-- 27.03.2025 update
-- Modify the BOOKINGS TABLE: Ensure checkout is after check-in and restrict status_payment values
ALTER TABLE bookings
ADD CONSTRAINT chk_checkout_after_checkin CHECK (checkout_date > checkin_date),
ADD CONSTRAINT chk_status_payment CHECK (status_payment IN ('pending', 'paid', 'cancelled'));


-- 20.04.2025
-- Add fields for USER table (To update profile)
-- Change role_id to role
ALTER TABLE users
    ADD COLUMN date_of_birth DATE,
    ADD COLUMN nationality VARCHAR(100);

ALTER TABLE users
DROP COLUMN role_id,
    ADD COLUMN role VARCHAR(10) NOT NULL DEFAULT 'USER' CHECK (role IN ('ADMIN', 'USER'));

-- 03.05.2025
-- REMOVE COLUMN title IN reviews table
ALTER TABLE reviews
DROP COLUMN title;

-- Rename the column "total_fare" to "total_price" in the bookings table
ALTER TABLE bookings
RENAME COLUMN total_fare TO total_price;

-- 06.05.2025
-- add field order code to bookings table
ALTER TABLE bookings
    ADD COLUMN order_code VARCHAR(255) DEFAULT NULL;
