import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const db = new pg.Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
})

db.connect();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

async function getBooks(){
    const books = await db.query("select * from books order by id asc");
    return books.rows;
}

//* -=-==-=-=-=-==-=-=--=-==-=-=-=-==-=-=--=-==-=-=-=-==-=-=--=-==-=-=-=-==-=-=--=-==-
app.get("/", async(req,res) => {
    const books = await getBooks();
    res.render("main.ejs", {books: books});
})


app.get("/book/:id", async(req,res) => {
    const bookId = req.params.id;
    //* query book from db
    const data = await db.query("select * from books where id = $1", [bookId]);
    const selectedBook = data.rows[0];

    const date = new Date(selectedBook.finished_date);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

    res.render("book.ejs", {
        book: selectedBook, 
        date: formattedDate,
        submit: "Edit Notes"
    });
})

app.get("/new", (req,res) => {
    res.render("new.ejs", {submit: "Add Entry"});
})

app.post("/new", async(req,res) => {
    console.log(req.body);
    try{
        await db.query("insert into books (isbn, title, finished_date, rating, recency, notes) values ($1, $2, $3, $4, $5)", 
            [req.body.isbn, req.body.title, req.body.date, req.body.rate, req.body.recency, req.body.note]
        );
        res.redirect("/");
    } catch (err){
        console.error("error adding book:", err);
        res.status(500).send("An error occurred while adding the book.");
    }
})

app.get("/edit", async(req,res) => {
    const bookId = parseInt(req.query.bookId);
    try{
        const data = await db.query("select * from books where id = $1", [bookId]);
        let book = data.rows[0];
        res.render("new.ejs", {
            book: book,
            submit: "Edit Entry",
        });
    } catch(err){
        console.error("error getting book:", err);
        res.status(500).send("An error occurred while getting the book.");
    }
})

app.post("/edit", async(req,res) => {
    console.log(req.body);
    try{
        await db.query("update books set isbn = $1, title = $2, finished_date = $3, rating = $4, recency = $5, notes = $6 where id = $7",
            [
                req.body.isbn, 
                req.body.title, 
                req.body.date, 
                req.body.rate, 
                req.body.recency, 
                req.body.note, 
                req.body.bookId
            ]
        );
        console.log(`succes editing entry`);
        res.redirect("/");
    } catch (err){
        console.error("error editing entry:", err);
        res.status(500).send("An error occurred while editing the entry.");
    }
})

app.get("/delete", async(req,res) => {
    console.log(req.query);
    try{
        await db.query("delete from books where id = $1", [req.query.bookId]);
        console.log(`succes deleting book`);
        res.redirect("/");
    } catch (err){
        console.error("error deleting book:", err);
        res.status(500).send("An error occurred while deleting the book.");
    }
})

app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
})