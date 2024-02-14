// Prefix : /author ,  so that server can understand this belongs to Book API

// Initializing Express Router
const Router = require("express").Router();

//Database models
const AuthorModel = require("../../database/author");

//AUTHORS API
/* 
Route          /author
Description   get all authors
Acess         PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json({ authors: getAllAuthors });
  });

/* 
  Route          /author
  Description    get specific authors based on id
  Acess         PUBLIC
  Parameter     id
  Methods       GET
  */
Router.get("/:id", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.id });
    if (!getSpecificAuthor) {
      return res.json({
        error: `no author found for the id of ${req.params.id}`,
      });
    }
  
    return res.json({ author: getSpecificAuthor });
  });

/* 
  Route         /author/book
  Description   get all author based on book
  Acess         PUBLIC
  Parameter     isbn
  Methods       GET
  */
Router.get("/book/:isbn", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({
      books: req.params.isbn,
    });
    if (!getSpecificAuthor) {
      return res.json({
        error: `no author found for the book of ISBN ${req.params.isbn}`,
      });
    }
  
    return res.json({ authors: getSpecificAuthor });
  });

/* 
Route          /author/add
Description   add new author
Acess         PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    return res.json({ message: "author was added!" });
  });

/* 
Route          /author/update/name
Description   update author name
Acess         PUBLIC
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async (req, res) => {
     const updatedAuthor = await AuthorModel.findOneAndUpdate(
       {
           id : parseInt(req.params.id),
       },
       {
           name : req.body.newAuthorName,
       },
       {
           new : true
       }
     )
     return res.json({ author: updatedAuthor, message :"author name was updated" });
   });

/* 
Route          /author/delete
Description   delete a author 
Acess         PUBLIC
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id",  async (req, res) => {
const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
    {
        id: parseInt(req.params.id),
    }
);
  return res.json({
    //  author: updatedAuthorDatabase, i did it on purpose bczz i think its not required
    message: "sucessfully deleted a author" });
});

module.exports = Router;