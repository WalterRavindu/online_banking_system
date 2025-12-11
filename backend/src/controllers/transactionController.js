const pool = require('../config/db');

exports.deposit = async (req, res) => {
  //const user_id = req.user.user_id;   // from JWT
  //const { account_id, amount } = req.body;
  const { user_id, account_id, amount } = req.body;

  try {
    if (!account_id || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid deposit request" });
    }

    // 1. Verify account belongs to this user
    const accountCheck = await pool.query(
      "SELECT * FROM accounts WHERE account_id = $1 AND user_id = $2",
      [account_id, user_id]
    );

    if (accountCheck.rows.length === 0) {
      return res.status(403).json({ message: "Access denied: No such account for this user" });
    }

    // 2. Update balance
    const updated = await pool.query(
      "UPDATE accounts SET balance = balance + $1 WHERE account_id = $2 RETURNING *",
      [amount, account_id]
    );

    // 3. Log transaction
    await pool.query(
      `INSERT INTO transactions (account_id, transaction_type, amount)
       VALUES ($1, 'DEPOSIT', $2)`,
      [account_id, amount]
    );

    res.status(200).json({
      message: "Deposit successful",
      account: updated.rows[0],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
