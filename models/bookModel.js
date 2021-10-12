const mongoose = require('mongoose');
/**
 * @bookSchema is the schema for the books database
 * @books here all keys are validated
 */
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        trim:true,
        required: true
    },
    isbn: {
        type: Number,
    },
    pageCount: {
        type: Number,
    },
    publishedDate: {
        type:Date,
    },
    thumbnailUrl:{
        type:String,
    },
    shortDescription:{
        type:String,
    },
    status: {
       type:String, 
    },
    authors:[{
        type:String, 
    }],
    categories: [{
        type:String, 
    }],
},
{timestamps: true});

module.exports = mongoose.model('Book', bookSchema);