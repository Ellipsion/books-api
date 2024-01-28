import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const authorModel = new PrismaClient().author;

// @desc Get all authors
// @route GET /authors
// @access Public
export const getAllAuthors = async (req: Request, res: Response) => {
    try {
        const allAuthors = await authorModel.findMany({
            include: {
                books: true
            }
        });

        return res.status(200).json({data: allAuthors, message: "Fetched all authors"});
    } catch (error) {
        console.log("[/authors] GET", error)
        return res.status(500).json({message: "Internal server error"})

    }
}

// @desc Get author by id
// @route GET /authors/:id
// @access Public
export const getAuthorById = async (req: Request, res: Response) => {
    const authorId = req.params.id;
    try {
        const author = await authorModel.findUnique({
            where: {
                id: authorId
            },
            include: {
                books: true
            }
        });
        return res.status(200).json({data: author, message: "Author Fetched"});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025') {
                console.log(
                  `[/authors/:id] GET :: Author with id ${authorId} does not exists`
                )
                return res.status(404).json({message: "Author does not exists"})
            }

        } else {
            console.log("[/authors/:id] GET", error)
        }
        return res.status(500).json({message: "Internal Server Error"})

    }
}

// @desc Create Author
// @route POST /authors/create
// @access Public
export const createAuthor = async (req: Request, res: Response) => {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({message: "Missing values"})
    }
    try {
        
        const author = await authorModel.create({
            data: {
                name,
            }
        });

        return res.status(201).json({data: author, message: "Author Created"});
    } catch (error) {
        console.log("[/authors/create] POST", error)
        return res.status(400).json({message: "Bad Request"})

    }
}

// @desc Update Author
// @route PATCH /authors/:id
// @access Public
export const updateAuthor = async (req: Request, res: Response) => {
    const authorId = req.params.id;
    const {name} = req.body;
    try {
        const author = await authorModel.update({
            where: {
                id: authorId
            },
            data: {
                name,
            }
        });

        return res.status(201).json({data: author, message: "Author Updated"});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025') {
                console.log(
                  `[/authors/:id] UPDATE :: Author with id ${authorId} does not exists`
                )
                return res.status(404).json({message: "Author does not exists"})
            }

        } else {
            console.log("[/authors/:id] UPDATE", error)
        }
        return res.status(500).json({message: "Internal Server Error"})

    }
}

// @desc Delete Author
// @route DELETE /authors/:id
// @access Public
export const deleteAuthor = async (req: Request, res: Response) => {
    const authorId = req.params.id;
    try {

        const author = await authorModel.delete({
            where: {
                id: authorId
            }
        });

        return res.status(200).json({data: author, message: "Author Deleted"});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === 'P2025') {
                console.log(
                  `[/authors/:id] DELETE :: Author with id ${authorId} does not exists`
                )
                return res.status(404).json({message: "Author does not exists"})
            }

        } else {
            console.log("[/authors/:id] DELETE", error)
        }
        return res.status(500).json({message: "Internal Server Error"})
    }
}