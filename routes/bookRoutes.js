const express = require('express');
const router = express.Router();
const {
  getBooks,
  addBook,
  updateBookBorrowStatus,
  patchBook,
  deleteBook
} = require('../controllers/bookController');


router.get('/books', getBooks);


router.post('/addbooks', addBook);


router.put('/updatebooks/:id', patchBook);


router.patch('/updatebooks/:id', updateBookBorrowStatus);

router.delete('/deletebooks/:id', deleteBook);

module.exports = router;
