import User from "../models/UserSchema.js";
import Transaction from "../models/TransactionModel.js";
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    console.log(users);
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    console.log(transactions);
    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: "No transactions found" });
    }
    return res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
  }
};
