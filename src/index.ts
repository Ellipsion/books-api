import express from "express";
import authorRouter from "./routes/AuthorRouter";
import bookRouter from "./routes/BookRoutes";

const app = express();
const port = 8000;

app.use(express.json())

app.get("/", (req, res) => {
    res.json({message: "Books API"}).status(200);
})

app.use("/authors", authorRouter)
app.use("/books", bookRouter)
 
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})