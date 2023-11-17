-- Create the chat_db database if it doesn't exist
CREATE DATABASE IF NOT EXISTS chat_db;

USE chat_db

-- Create the User table
CREATE TABLE IF NOT EXISTS User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

-- Create the Message table with a foreign key
CREATE TABLE IF NOT EXISTS Message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_by INT,
  FOREIGN KEY (sent_by) REFERENCES User(id)
);