const Book = require('../models/bookModel');

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const addBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateBookBorrowStatus=async (req, res) => {
  const { id } = req.params;
  const { isborrowed } = req.body;
  try {
      const updatedBook = await Book.findByIdAndUpdate(
          id,
          { isborrowed },
          { new: true }
      );

      if (!updatedBook) {
          return res.status(404).json({ message: 'Book not found' });
      }

      res.status(200).json(updatedBook);
  } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ message: 'Server error while updating book' });
  }
};

const patchBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    Object.assign(book, req.body);  
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.findOneAndDelete({ _id: req.params.id });
    const book = await Book.findById(req.params.id);
    if (book) {
      return res.json({ message: 'Book not deleted' });
    }
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBooks,
  addBook,
  updateBookBorrowStatus,
  patchBook,
  deleteBook
};
