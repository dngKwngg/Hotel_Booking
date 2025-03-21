-- DROP TABLES IF EXIST
DROP TABLE IF EXISTS payments, booking_details, bookings, hotel_amenities, rooms, hotel_rooms, amenities, hotels,
    room_types, provinces, users, roles, reviews;

-- ROLES TABLE (One-to-Many: A user has one role, but a role can belong to many users)
CREATE TABLE roles (
                       id SERIAL PRIMARY KEY,
                       name VARCHAR(50) UNIQUE NOT NULL  -- e.g., 'user', 'admin'
);

-- USERS TABLE (Many-to-One: Many users belong to one role)
CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       username VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       first_name VARCHAR(255) NOT NULL,
                        last_name VARCHAR(255) NOT NULL,
                       role_id INT NOT NULL,  -- Foreign key to roles
                       FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- PROVINCES TABLE (One-to-Many: One province has many hotels)
CREATE TABLE provinces (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL
);

-- HOTELS TABLE (Many-to-One: Many hotels belong to one province)
CREATE TABLE hotels (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        province_id INT NOT NULL,
                        FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE
);

-- ROOM TYPES TABLE (Independent table for room classification)
CREATE TABLE room_types (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255) NOT NULL,
                            price INT NOT NULL CHECK (price >= 0)
);

-- HOTEL ROOMS TABLE (Many-to-Many: A hotel can have many room types, and a room type can belong to many hotels)
CREATE TABLE hotel_rooms (
                             hotel_id INT NOT NULL,
                             room_type_id INT NOT NULL,
                             number_rooms INT NOT NULL CHECK (number_rooms >= 0),
                             PRIMARY KEY (hotel_id, room_type_id),
                             FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
                             FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

-- INDIVIDUAL ROOMS TABLE (One-to-Many: A hotel has many rooms)
CREATE TABLE rooms (
                       id SERIAL PRIMARY KEY,
                       hotel_id INT NOT NULL,
                       room_type_id INT NOT NULL,
                       room_number VARCHAR(50) UNIQUE NOT NULL,
                       status VARCHAR(50) DEFAULT 'available',  -- available, booked, under maintenance
                       FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
                       FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

-- AMENITIES TABLE (Independent table for amenities)
CREATE TABLE amenities (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL
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

-- BOOKING DETAILS TABLE (Many-to-One: Many booking details belong to one booking)
CREATE TABLE booking_details (
                                 id SERIAL PRIMARY KEY,
                                 booking_id INT NOT NULL,
                                 room_id INT NOT NULL,
                                 room_type_id INT NOT NULL,
                                 FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
                                 FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
                                 FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

-- PAYMENTS TABLE (One-to-One: One booking has one payment)
CREATE TABLE payments (
                          id SERIAL PRIMARY KEY,
                          booking_id INT NOT NULL UNIQUE,
                          user_id INT NOT NULL,
                          amount INT NOT NULL CHECK (amount >= 0),
                          payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          payment_status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
                          transaction_id VARCHAR(100) UNIQUE NOT NULL,
                          FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- REVIEWS TABLE (One-to-Many: A user can write multiple reviews)
CREATE TABLE reviews (
                         id SERIAL PRIMARY KEY,
                         user_id INT NOT NULL,
                         hotel_id INT NOT NULL,
                         rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
                         comment TEXT,
                         review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE
);
