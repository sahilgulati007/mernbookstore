import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookmodel.js";

const app = express();
app.use(express.json());

app.post('/books', async(req,res)=>{
    console.log(req.body);
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send("all fields are required ");
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});

app.get('/books', async(req,res)=>{
    try{
        const book= await Book.find({});
        // return res.status(201).send(book);
        return res.status(201).json({
            count:book.length,
            data: book,
        });
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
});

app.get('/book/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const book= await Book.findById(id);
        // return res.status(201).send(book);
        return res.status(201).json(book);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({message: err.message});
    }
});
app.get('/',(req, res)=>{
    res.send("<h1>Welcome to book store Backend</h1>");
    //return res.status(204).send("book stire");
});

app.listen(PORT, ()=>{
    console.log(`app is listening to port ${PORT}`);
});

mongoose.connect(mongoDBURL).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});