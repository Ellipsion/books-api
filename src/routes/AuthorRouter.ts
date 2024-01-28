 import {Router} from "express";
import {createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor} from "../controllers/AuthorController";

const authorRouter = Router()

// @desc Get all authors
// @route GET /authors
// @access Public
authorRouter.get("/", getAllAuthors)

// @desc Get author by id
// @route GET /authors/:id
// @access Public
authorRouter.get("/:id", getAuthorById)


// @desc Create Author
// @route POST /authors/create
// @access Public
authorRouter.post("/create", createAuthor)

// @desc Update Author
// @route PATCH /authors/:id
// @access Public
authorRouter.patch("/:id", updateAuthor)

// @desc Delete Author
// @route DELETE /authors/:id
// @access Public
authorRouter.delete("/:id", deleteAuthor)

export default authorRouter;