const requireAuth = require('../Middlewares/requireAuth'); 
const {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction
} = require('../Controllers/TransactionController');

const router = require('express').Router();

router.get('/', requireAuth, getTransactions);
router.post('/', requireAuth, addTransaction);
router.put('/:id', requireAuth, updateTransaction);
router.delete('/:id', requireAuth, deleteTransaction);

module.exports = router;