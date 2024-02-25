CREATE DATABASE user_test;

USE user_test;

CREATE TABLE users(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255),
    full_name VARCHAR(255),
    address VARCHAR(255)
);

INSERT INTO users (email, password, full_name, address) VALUES
('email1@example.com', 'password1', 'Full Name 1', 'Address 1'),
('email2@example.com', 'password2', 'Full Name 2', 'Address 2'),
('email3@example.com', 'password3', 'Full Name 3', 'Address 3'),
('email4@example.com', 'password4', 'Full Name 4', 'Address 4'),
('email5@example.com', 'password5', 'Full Name 5', 'Address 5'),
('email6@example.com', 'password6', 'Full Name 6', 'Address 6'),
('email7@example.com', 'password7', 'Full Name 7', 'Address 7'),
('email8@example.com', 'password8', 'Full Name 8', 'Address 8'),
('email9@example.com', 'password9', 'Full Name 9', 'Address 9'),
('email10@example.com', 'password10', 'Full Name 10', 'Address 10');
