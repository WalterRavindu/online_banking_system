DROP DATABASE if EXISTS bankdb;

CREATE DATABASE bankdb;
\c bankdb

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  balance NUMERIC(12, 2) DEFAULT 0
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  from_acc INT REFERENCES accounts(id),
  to_acc INT REFERENCES accounts(id),
  amount NUMERIC(12, 2),
  type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
