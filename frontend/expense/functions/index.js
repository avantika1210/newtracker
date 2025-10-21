const functions = require("firebase-functions/v2");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require("dotenv").config();

admin.initializeApp();

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: gmailEmail, pass: gmailPassword },
});

exports.sendWeeklySummary = onSchedule(
  "every monday 09:00", // real weekly schedule
  { timeZone: "Asia/Kolkata" },
  async (context) => {
    try {
      const usersSnapshot = await admin.firestore().collection("users").get();

      for (const userDoc of usersSnapshot.docs) {
        const user = userDoc.data();
        const transactionsSnapshot = await admin.firestore()
          .collection("transactions")
          .where("userId", "==", userDoc.id)
          .where("date", ">=", getLastWeekDate())
          .get();

        let income = 0,
            expense = 0;

        transactionsSnapshot.forEach((tx) => {
          const amt = tx.data().amount;
          if (amt >= 0) income += amt;
          else expense += Math.abs(amt);
        });

        const mailOptions = {
          from: gmailEmail,
          to: user.email,
          subject: `Your Weekly Expense Summary`,
          text: `Hello ${user.name || ""}!\n\nThis week's summary:\nIncome: ₹${income}\nExpense: ₹${expense}\nNet: ₹${income - expense}\n\nKeep tracking!`,
        };

        await transporter.sendMail(mailOptions);
      }

      console.log("Weekly summary emails sent!");
    } catch (error) {
      console.error("Error sending weekly summary:", error);
    }
  }
);

function getLastWeekDate() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
}