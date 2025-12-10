const  pool  = require('../config/db'); // make sure pool is imported
require('dotenv').config();

exports.createAccount = async (req, res) => {
  //const { user_id, account_type } = req.body;
  const { account_type } = req.body;
  const email = req.user.email; // from login token

  if (!user_id || !account_type) {
    return res.status(400).json({ message: "Email and account_type are required" });
  }

  try {
    /*
    // Step 1: Get user_id from email
    const userResult = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = userResult.rows[0].id;
    */
    
    // Step 2: Insert account
    const accountResult = await pool.query(
      `INSERT INTO accounts (user_id, account_type, balance)
       VALUES ($1, $2, $3) RETURNING *`,
      [user_id, account_type, 0.00]
    );

    res.status(201).json({
      message: "Account created successfully",
      account: accountResult.rows[0]
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
