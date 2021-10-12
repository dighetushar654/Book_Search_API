const { schema } = require("../models/bookModel");
const mongoose = require("mongoose");
const Book = mongoose.model('Book', schema);
const dotenv = require("dotenv");
dotenv.config();
/**
 * 
 * @param {get all books data} req 
 * @param {show data you saved on database} res 
 * @returns 
 */
exports.add_books = async (req, res) => {
    try {
        const {
            title,
            isbn,
            pageCount,
            publishedDate,
            thumbnailUrl,
            shortDescription,
            longDescription,
            status,
            authors,
            categories
        } = req.body;

        // const bookExist = Book.find(b=> b.isbn === isbn);
        // if (bookExist)
        //     return res.send('Book already exist');

        let book = new Book({
            title,
            isbn,
            pageCount,
            publishedDate,
            thumbnailUrl,
            shortDescription,
            longDescription,
            status,
            authors,
            categories
        });
        await book.save();
        res.status(200).json(book);
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}

/**
 * 
 * @param {get query from user} req 
 * @param {filter the query and display result and search book using isbn is also capable this route} res 
 */
exports.get_all = async (req, res) => {
    try {
        let {key} = req.body;
        if(key === process.env.SecretKey) {
            const books = await Book.find();
            // res.json(books);
            const filters = req.query;
            const filteredCategory = books.filter(category => {
                let isValid = true;
                for (key in filters) {
                    // console.log(key, category[key], filters[key]);
                    isValid = isValid && category[key] == filters[key];
                }
                return isValid;
            })
            res.send(filteredCategory);
        } else {
            res.status(400).json("UNAUTHORIZED")
        }
        
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}
/**
 * 
 * @param {get book id} req 
 * @param {show updated data or error} res 
 * @returns 
 */
exports.update_book = async (req, res) => {
    try {
        const { isbn } = req.body;
        let book = booksDirectory.find(b => b.isbn === id);
        if (!book)
            return res.status(404).send('Book does not exist');

        const bookdata = await Book.findByIdAndUpdate(req.params.id,{
            $set: req.body,
        },{new:true});
        res.status(200).json(bookdata);

    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}
/**
 * 
 * @param {get book id} req 
 * @param {delete given id book} res 
 */
exports.delete_book = async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Book has been deleted")
    } catch (err) {
        console.log(err);
        res.status(500).json({err});
    }
}