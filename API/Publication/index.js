// Prefix : /publication ,  so that server can understand this belongs to Book API

// Initializing Express Router
const Router = require("express").Router();

//Database models
const PublicationModel = require("../../database/publication");

//PUBLICATION API
/* 
Route         /publication
Description   get all publications
Acess         PUBLIC
Parameter     NONE
Methods       GET
*/
Router.get("/", async (req, res) => {
    const getAllpublication = await PublicationModel.find();
    return res.json({ publication: getAllpublication });
  });
  
/* 
  Route          /publication
  Description    get specific publication based on id
  Acess         PUBLIC
  Parameter     id
  Methods       GET
  */
Router.get("/:id", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({
      id: req.params.id,
    });
    if (!getSpecificPublication) {
      return res.json({
        error: `no publication found for the id of ${req.params.id}`,
      });
    }
  
    return res.json({ publication: getSpecificPublication });
  });
  
 /* 
  Route          /publication/book
  Description    get all publication based on book
  Acess         PUBLIC
  Parameter     isbn
  Methods       GET
  */
Router.get("/book/:isbn", async (req, res) => {
    const getSpecificPublication = await PublicationModel.findOne({
      books: req.params.isbn,
    });
    if (!getSpecificPublication) {
      return res.json({
        error: `no publication found for the book of ISBN ${req.params.isbn}`,
      });
    }
  
    return res.json({ publication: getSpecificPublication });
  });

/* 
Route          /publication/add
Description   add new publication
Acess         PUBLIC
Parameter     NONE
Methods       POST
*/
Router.post("/add", async (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({ message: "publication was added!" });
  });

/* 
Route          /publication/update/name
Description   update publication name
Acess         PUBLIC
Parameter     id
Methods       PUT
*/
Router.put("/update/name/:id", async (req, res) => {
  const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
        id : parseInt(req.params.id),
    }, 
    {
        name : req.body.newPublicationName,
    },
    {
        new : true,
    }
  )
  return res.json({ publication: updatedPublication, message:"publication name was updated" });
});

/* 
Route          /publication/update/book
Description   update/add books to publication
Acess         PUBLIC
Parameter     id, isbn
Methods       PUT
*/
Router.put("/update/book/:id/:isbn", async (req, res) => {
 //update publication
   const updatedPublication = await PublicationModel.findOneAndUpdate(
    {
           id : parseInt(req.params.id),
    }, 
    {
        $addToSet:{
            books : req.params.isbn,
        }
    },
    {
        new : true
    }
   );

   //update books
   const updatedBook = await BookModel.findOneAndUpdate(
    {
        ISBN : req.params.isbn,
    },
    {
        $addToSet:{
            publications: parseInt(req.params.id),
        }
    },
    {
        new: true
    }
   );
  return res.json({ publication: updatedPublication, book: updatedBook  , message : " New publication was added "});
});

/* 
Route          /publication/delete
Description   delete a publication 
Acess         PUBLIC
Parameter     id
Methods       DELETE
*/
Router.delete("/delete/:id", async (req, res) => {
    const updatedPublicationDatabase = await PublicationModel.findOneAndDelete(
       {
           id : parseInt(req.params.id)
       }
    );
     return res.json({
       // publication: database.publications, i did it on purpose bczz i think its not required
       message: "sucessfully deleted a publication",
     });
   });
   
/* 
   Route          /publication/delete/book
   Description   delete a book from a publication
   Acess         PUBLIC
   Parameter     pubId,isbn
   Methods       DELETE
   */
Router.delete("/delete/book/:pubId/:isbn",  async (req, res) => {
    //update publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
       {
           id : parseInt(req.params.pubId)
       },
       {
           $pull :{
               books : req.params.isbn
           }
       },
       {
            new : true
       }
    );
   
    // update books database
    const updatedBook = await BookModel.findOneAndUpdate(
       {
           ISBN  : req.params.isbn
       },
       {
           $pull:{
               publications : parseInt(req.params.pubId)
           }
       }, 
       {
            new: true
       }
    );
   
     return res.json({
       publication: updatedPublication,
       book: updatedBook,
       message: "book was sucessfully deleted from publication",
     });
   });

module.exports = Router;