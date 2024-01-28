import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const bookModel = new PrismaClient().book;
const authorModel = new PrismaClient().author;

// @desc Get all books
// @route GET /books
// @access Public
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const allBooks = await bookModel.findMany();

        return res.status(200).json({data: allBooks, message: "Fetched all boooks"});
    } catch (error) {
        console.log("[/authors] GET", error)
        return res.status(500).json({message: "Internal server error"})

    }
}

// @desc Get book by id
// @route GET /books/:id
// @access Public
export const getBookById = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        const book = await bookModel.findUnique({
            where: {
                id: bookId
            },
            include: {
                author: true
            }
        });

        if (!book) {
            return res.status(404).json({message: "Book does not exists"})
        }
        return res.status(200).json({data: book, message: "Book Fetched"});
    } catch (error) {
        console.log("[/books/:id] GET", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

// @desc Create Book
// @route POST /books/create
// @access Public
export const createBook = async (req: Request, res: Response) => {
    const {title, authorId} = req.body;
    if (!title || !authorId) {
        return res.status(400).json({message: "Missing values"})
    }
    try {
        const author = await authorModel.findUnique({
            where: {
                id: authorId
            }
        })

        if (!author) {
            return res.status(400).json({message: "Author does not exists"})
        }
        const newBook = await bookModel.create({
            data: {
                title,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            }
        });

        return res.status(201).json({data: newBook, message: "Book Created"});
    } catch (error) {
        console.log("[/books/create] POST", error)
        return res.status(400).json({message: "Bad Request"})
    }
}

// @desc Update Book
// @route PATCH /books/:id
// @access Public
export const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const {title} = req.body;
    try {
        const book = await bookModel.update({
            where: {
                id: bookId
            },
            data: {
                title,
            }
        });

        return res.status(201).json({data: book, message: "Book Updated"});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025') {
                console.log(
                  `[/books/:id] PATCH :: Book with id ${bookId} does not exists`
                )
                return res.status(404).json({message: "Book does not exists"})
            }

        } else {
            console.log("[/books/:id] PATCH", error)
        }
        return res.status(500).json({message: "Internal Server Error"})

    }
}

// @desc Delete Book
// @route DELETE /books/:id
// @access Public
export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {

        const book = await bookModel.delete({
            where: {
                id: bookId
            }
        });

        return res.status(200).json({data: book, message: "Book Deleted"});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025') {
                console.log(
                  `[/books/:id] DELETE :: Author with id ${bookId} does not exists`
                )
                return res.status(404).json({message: "Book does not exists"})
            }

        } else {
            console.log("[/books/:id] DELETE", error)
        }
        return res.status(500).json({message: "Internal Server Error"})
    }
}