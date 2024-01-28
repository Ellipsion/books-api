import {Router} from "express";
import  {getAllBooks, getBookById, createBook, updateBook, deleteBook} from "../controllers/BookController"

const bookRouter = Router()

// @desc Get all books
// @route GET /books
// @access Public
bookRouter.get("/", getAllBooks)

// @desc Get book by id
// @route GET /books/:id
// @access Public
bookRouter.get("/:id", getBookById)


// @desc Create Book
// @route POST /books/create
// @access Public
bookRouter.post("/create", createBook)

// @desc Update Book
// @route PATCH /books/:id
// @access Public
bookRouter.patch("/:id", updateBook)

// // @desc Delete Book
// // @route DELETE /books/:id
// // @access Public
bookRouter.delete("/:id", deleteBook)

export default bookRouter;