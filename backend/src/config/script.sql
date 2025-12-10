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
    account_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE SET NULL,
    
    account_type VARCHAR(20) NOT NULL,
    balance NUMERIC(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW()
);




CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  from_acc INT REFERENCES accounts(account_id),
  to_acc INT REFERENCES accounts(account_id),
  amount NUMERIC(12, 2),
  type VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
