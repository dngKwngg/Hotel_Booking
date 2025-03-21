-- CREATE DATABASE booking_management;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS hotel_amenities;
DROP TABLE IF EXISTS hotel_rooms;
DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS hotels;
DROP TABLE IF EXISTS room_types;
DROP TABLE IF EXISTS provinces;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id SERIAL PRIMARY KEY,
                       email VARCHAR(255),
                       username VARCHAR(255),
                       password VARCHAR(255)
);

CREATE TABLE provinces (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255)
);

CREATE TABLE hotels (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255),
                        province_id INT,
                        FOREIGN KEY (province_id) REFERENCES provinces(id) ON DELETE CASCADE
);

CREATE TABLE room_types (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255),
                            price INT
);

CREATE TABLE hotel_rooms (
                             hotel_id INT,
                             room_type_id INT,
                             number_rooms INT,
                             PRIMARY KEY (hotel_id, room_type_id),
                             FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
                             FOREIGN KEY (room_type_id) REFERENCES room_types(id) ON DELETE CASCADE
);

CREATE TABLE amenities (
                           id SERIAL PRIMARY KEY,
                           name VARCHAR(255)
);

CREATE TABLE hotel_amenities (
                                 hotel_id INT,
                                 amenity_id INT,
                                 PRIMARY KEY (hotel_id, amenity_id),
                                 FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
                                 FOREIGN KEY (amenity_id) REFERENCES amenities(id) ON DELETE CASCADE
);

CREATE TABLE bookings (
                          id SERIAL PRIMARY KEY,
                          user_id INT,
                          hotel_id INT,
                          checkin_date DATE,
                          checkout_date DATE,
                          total_fare INT,
                          booking_date DATE,
                          status_payment VARCHAR(255),
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                          FOREIGN KEY (hotel_id) REFERENCES hotels(id) ON DELETE CASCADE,
);
