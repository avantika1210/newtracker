const TransactionModel = require('../Models/Transaction');

// ✅ Get all transactions for logged-in user
const getTransactions = async (req, res) => {
  try {
    const userId = req.user._id; // req.user comes from requireAuth middleware
    const transactions = await TransactionModel.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// ✅ Add a new transaction
const addTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, amount, type, date } = req.body;

    const transaction = new TransactionModel({
      user: userId,
      title,
      amount,
      type, // "income" or "expense"
      date: date || new Date()
    });

    await transaction.save();

    res.status(201).json({ message: "Transaction added ✅", success: true, transaction });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// ✅ Update a transaction by ID
const updateTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;
    const { title, amount, type, date } = req.body;

    const transaction = await TransactionModel.findOneAndUpdate(
      { _id: id, user: userId },
      { title, amount, type, date },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found", success: false });
    }

    res.status(200).json({ message: "Transaction updated ✅", success: true, transaction });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

// ✅ Delete a transaction by ID
const deleteTransaction = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    const transaction = await TransactionModel.findOneAndDelete({ _id: id, user: userId });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found", success: false });
    }

    res.status(200).json({ message: "Transaction deleted ✅", success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
};