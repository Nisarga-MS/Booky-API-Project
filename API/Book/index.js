// Prefix : /book ,  so that server can understand this belongs to Book API

// Initializing Express Router
const Router = require("express").Router();

//Database models
const BookModel = require("../../database/book");


//BOOK API
/* 
Route          /
Description   get all books
Acess         PUBLIC
Parameter     NONE
Methods       GET
*/
// AFTER ADDING MONGODB instead of booky.get use Router.get
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ books: getAllBooks });
  });

/* 
Route          /is
Description   get specific books based on ISBN
Acess         PUBLIC
Parameter     isbn
Methods       GET
*/
Router.get("/is/:isbn", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  
    if (!getSpecificBook) {
      return res.json({
        error: `no book found for the ISBN of ${req.params.isbn}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });

/* 
Route          /c
Description   get specific book based on category
Acess         PUBLIC
Parameter     category
Methods       GET
*/
Router.get("/c/:category", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
      category: req.params.category,
    });
  
    if (!getSpecificBook) {
      return res.json({
        error: `no book found for the category of ${req.params.category}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });

/* 
Route          /l
Description   get specific book based on language
Acess         PUBLIC
Parameter     language
Methods       GET
*/
Router.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({
      language: req.params.language,
    });
  
    if (!getSpecificBook) {
      return res.json({
        error: `no book found for the language of ${req.params.language}`,
      });
    }
  
    return res.json({ book: getSpecificBook });
  });

/* 
Route          /book/add
Description   add new book
Acess         PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async (req, res) => {
  try {
    const { newBook } = req.body;
   await BookModel.create(newBook);
    return res.json({ message: "book was added!" });

  } catch (error) {
      return res.json({error: error.message})
  }
    
  });

/* 
Route         /book/update/title
Description   update book title
Acess         PUBLIC
Parameter     isbn
Methods       PUT
*/
Router.put("/update/title/:isbn", async (req, res) => {
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        title: req.body.newBookTitle,
      },
      {
        new: true,
      }
    );
  
    return res.json({ books: updatedBook, message: "Book title was updated" });
  });

/* 
Route         /book/update/author
Description   update/add new author for a book
Acess         PUBLIC
Parameter     isbn,authorId
Methods       PUT
*/
Router.put("/update/author/:isbn/:authorId", async (req, res) => {
    //update book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $addToSet: {
          author: parseInt(req.params.authorId),
        },
      },
      {
        new: true,
      }
    );
  
    //update author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: parseInt(req.params.authorId),
      },
      {
        $addToSet: {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      }
    );
  
    return res.json({
      books: updatedBook,
      author: updatedAuthor,
      message: "New author was added",
    });
  });


/* 
Route          /book/delete
Description   delete a book
Acess         PUBLIC
Parameter     isbn
Methods       DELETE
*/
Router.delete("/delete/:isbn",  async(req, res) => {
    const updatedBookDatabase = await BookModel.findOneAndDelete(
        {
            ISBN : req.params.isbn
        }
    );
      return res.json({
        // books: updatedBookDatabase , i did on purpose i thinks its not required
        message: "sucessfully deleted a book",
      });
    });

/* 
Route          /book/delete/author
Description   delete a author from a book
Acess         PUBLIC
Parameter     isbn,authorId
Methods       DELETE
*/
Router.delete("/delete/author/:isbn/:authorId", async (req, res) => {
    //update book database
      const updatedBook = await BookModel.findOneAndUpdate(
        {
            ISBN : req.params.isbn,
        },
        {
            $pull: {
                author : parseInt(req.params.authorId),
            }
        },
        {
            new: true,
        }
      );
    
      //update author database
      const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
            id : parseInt(req.params.authorId),
        },
        {
            $pull:{
                books : req.params.isbn,
            }
        },
        {
            new: true,
        }
      )
      return res.json({
        book: updatedBook,
        author: updatedAuthor,
        message: "author was sucessfully deleted from book",
      });
    });
    



module.exports = Router;

