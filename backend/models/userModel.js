import pool from "../src/config/db.js";

// Insert new user
export const createUser = async (name, email, passwordHash) => {
  const query = `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const result = await pool.query(query, [name, email, passwordHash]);
  return result.rows[0];
};

// Find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

// Get all users (for testing)
export const getAllUsers = async () => {
  const result = await pool.query("SELECT id, name, email FROM users");
  return result.rows;
};
