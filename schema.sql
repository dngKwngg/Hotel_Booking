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
	id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255)
);





CREATE TABLE provinces (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255)
);







CREATE TABLE hotels (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
    province_id INT,
    FOREIGN KEY (province_id) REFERENCES provinces(id)
);






CREATE TABLE room_types (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255),
    price INT
);






CREATE TABLE hotel_rooms (
	hotel_id INT ,
    room_type_id INT,
    number_rooms INT,
    PRIMARY KEY (hotel_id, room_type_id),
	FOREIGN KEY (hotel_id) REFERENCES hotels(id),
	FOREIGN KEY (room_type_id) REFERENCES room_types(id)
);






CREATE TABLE amenities (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255)
);



CREATE TABLE hotel_amenities (
	hotel_id INT ,
    amenity_id INT,
    PRIMARY KEY (hotel_id, amenity_id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id),
    FOREIGN KEY (amenity_id) REFERENCES amenities(id)
);




CREATE TABLE bookings (
	id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT UNIQUE,
    hotel_id INT UNIQUE,
    checkin_date INT,
    checkout_date INT,
	total_fare INT,
    booking_date INT,
    status_payment VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (hotel_id) REFERENCES hotels(id)
);