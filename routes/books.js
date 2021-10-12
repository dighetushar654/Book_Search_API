const router = require('express').Router();
const bookController = require("../controllers/bookController");
/**
 * @public this all are the routes for the books api
 * @bookController is logic part of enpoints
 */
router
    .post("/", bookController.add_books)
    .get("/", bookController.get_all)
    .put("/:id", bookController.update_book)
    .delete("/:id", bookController.delete_book);

module.exports = router;