require("dotenv").config();
// Frame work
const express = require("express");

// mangoose
const mongoose = require("mongoose");

//Database
const database = require("./database/index");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

//initialization
const booky = express();

//configure
booky.use(express.json());

// Establish database connection
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connection established!!!!!"));

//BOOK API
/* 
Route          /
Description   get all books
Acess         PUBLIC
Parameter     NONE
Methods       GET
*/

  // BEFORE ADDING MONGODB
// booky.get("/",(req,res)=>{
//  return res.json({books: database.books})
// });

  // AFTER ADDING MONGODB
  booky.get("/", async(req,res)=>{
    const getAllBooks = await BookModel.find();
    return res.json({ books : getAllBooks});
});


/* 
Route          /is
Description   get specific books based on ISBN
Acess         PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/is/:isbn", async(req,res)=>{

    // BEFORE ADDING MONGODB
    // const getSpecificBook = database.books.filter(
    //     (book)=>book.ISBN === req.params.isbn
    // );

    // AFTER ADDING MONGODB
    const getSpecificBook = await  BookModel.findOne({ISBN : req.params.isbn})

    if(!getSpecificBook){
        return res.json({error:`no book found for the ISBN of ${req.params.isbn}`});
    }

    return res.json({book: getSpecificBook});
});


/* 
Route          /c
Description   get specific book based on category
Acess         PUBLIC
Parameter     category
Methods       GET
*/
booky.get("/c/:category", async(req,res)=>{

    // BEFORE ADDING MONGODB
    // const getSpecificBook = database.books.filter(
    //     (book)=>book.category.includes(req.params.category)
    //     );

    // AFTER ADDING MONGODB
    const getSpecificBook = await BookModel.findOne({category : req.params.category})

        if(!getSpecificBook){
            return res.json({error:`no book found for the category of ${req.params.category}`});
        }
        
        return res.json({book: getSpecificBook});
});


/* 
Route          /l
Description   get specific book based on language
Acess         PUBLIC
Parameter     language
Methods       GET
*/
booky.get("/l/:language", async (req,res)=>{

    // BEFORE ADDING MONGODB
    // const getSpecificBook = database.books.filter(
    //     (book)=>book.language === req.params.language
    //     );

    // AFTER ADDING MONGODB
    const getSpecificBook = await BookModel.findOne({language: req.params.language})

    if(!getSpecificBook){
        return res.json({error:`no book found for the language of ${req.params.language}`});
    }

    return res.json({book: getSpecificBook})
});


//AUTHORS API
/* 
Route          /author
Description   get all authors
Acess         PUBLIC
Parameter     NONE
Methods       GET
*/

  // BEFORE ADDING MONGODB
// booky.get("/author",(req,res)=>{
//     return res.json({authors:database.authors})
// });

// AFTER ADDING MONGODB
booky.get("/author", async(req,res)=>{
    const getAllAuthors = await AuthorModel.find();
    return res.json({authors : getAllAuthors});

})

/* 
Route          /author
Description    get specific authors based on id
Acess         PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/author/:id", async(req,res)=>{

    // BEFORE ADDING MONGODB
    // const getSpecificAuthor = database.authors.filter(
    //     (author)=> author.id === parseInt(req.params.id)
    // );

    // AFTER ADDING MONGODB
    const getSpecificAuthor = await AuthorModel.findOne({id : req.params.id})
    if (!getSpecificAuthor){
        return res.json({error:`no author found for the id of ${req.params.id}`});
    }

    return res.json({author: getSpecificAuthor});
});


/* 
Route         /author/book
Description   get all author based on book
Acess         PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/author/book/:isbn", async(req,res)=>{

     // BEFORE ADDING MONGODB
    // const getSpecificAuthor = database.authors.filter(
    //     (author)=> author.books.includes(req.params.isbn)
    // );

     // AFTER ADDING MONGODB
     const getSpecificAuthor = await AuthorModel.findOne({books : req.params.isbn})
    if(!getSpecificAuthor){
        return res.json({error:`no author found for the book of ISBN ${req.params.isbn}`});
    }

    return res.json({authors: getSpecificAuthor})
});


//PUBLICATION API
/* 
Route         /publication
Description   get all publications
Acess         PUBLIC
Parameter     NONE
Methods       GET
*/

// BEFORE ADDING MONGODB
// booky.get("/publication", (req,res)=>{
//     return res.json({publications: database.publications})
// });

// AFTER ADDING MONGODB
  booky.get("/publication", async (req,res)=>{
    const getAllpublication = await PublicationModel.find();
    return res.json({publication: getAllpublication});
  });


/* 
Route          /publication
Description    get specific publication based on id
Acess         PUBLIC
Parameter     id
Methods       GET
*/
booky.get("/publication/:id", async (req,res)=>{

    // BEFORE ADDING MONGODB
    // const getSpecificPublication =database.publications.filter(
    //     (publication)=> publication.id === parseInt(req.params.id)
    // );

    // AFTER ADDING MONGODB
   const  getSpecificPublication = await PublicationModel.findOne({id: req.params.id})
    if(!getSpecificPublication){
        return res.json({error:`no publication found for the id of ${req.params.id}`});
    }

    return res.json({publication: getSpecificPublication});
})


/* 
Route          /publication/book
Description    get all publication based on book
Acess         PUBLIC
Parameter     isbn
Methods       GET
*/
booky.get("/publication/book/:isbn",  async(req,res)=>{

    // BEFORE ADDING MONGODB
    // const getSpecificPublication =database.publications.filter(
    //     (publication)=> publication.books.includes(req.params.isbn)
    // );

    // AFTER ADDING MONGODB
    const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn})
    if(!getSpecificPublication){
        return res.json({error:`no publication found for the book of ISBN ${req.params.isbn}`});
    }

    return res.json({publication: getSpecificPublication});
})


//BOOK API
/* 
Route          /book/add
Description   add new book
Acess         PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/book/add", async (req,res)=>{
      const {newBook} = req.body;

    //BEFORE ADDIND MONGODB
    //   database.books.push(newBook); 

    // AFTER ADDING MONGODB
      BookModel.create(newBook);
      return res.json({message: "book was added!"})

    //sample code tht applies to other routes of add
    // const  addNewBook = BookModel.create(newBook); extra addnewbook thing removed
    //   return res.json({books: addNewBook , message: "book was added!"})
});


//AUTHOR API
/* 
Route          /author/add
Description   add new author
Acess         PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/author/add",  async(req,res)=>{
    const {newAuthor} = req.body;

    //BEFORE ADDING MONGODB
    // database.authors.push(newAuthor); 

    //AFRER ADDING MONGODB
    AuthorModel.create(newAuthor);
    return res.json({message: "author was added!"})
});


//Publication API
/* 
Route          /publication/add
Description   add new publication
Acess         PUBLIC
Parameter     NONE
Methods       POST
*/
booky.post("/publication/add", async(req,res)=>{
    const {newPublication}= req.body;

    //BEFORE ADDING MONDODB
    // database.publications.push(newPublication); 

    //AFTER ADDING MONGODB
    PublicationModel.create(newPublication);
    return res.json({message: "publication was added!"})
});


//BOOK API
/* 
Route         /book/update/title
Description   update book title
Acess         PUBLIC
Parameter     isbn
Methods       PUT
*/
booky.put("/book/update/title/:isbn", async (req,res)=>{

    //BEFORE ADDING MONDODB
//     database.books.forEach((book) =>{
//     if(book.ISBN === req.params.isbn){
//         book.title = req.body.newBookTitle;
//         return;
//     }
//    });

   //AFTER ADDING MONDODB
   const updatedBook = await  BookModel.findOneAndUpdate(
    {
        ISBN : req.params.isbn,
    },
    {
        title : req.body.newBookTitle,
   },
   {
     new : true,
   }
   );

   return res.json({books:updatedBook}) ; 

});


/* 
Route         /book/update/author
Description   update/add new author for a book
Acess         PUBLIC
Parameter     isbn,authorId
Methods       PUT
*/
booky.put("/book/update/author/:isbn/:authorId", (req,res) =>{
    
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            return  book.author.push(parseInt(req.params.authorId));
         }
    });

    //update author database
    database.authors.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)) {
        return author.books.push(req.params.isbn);
        }
    });

    return res.json({books: database.books, author:database.authors});
});


/* 
Route          /author/update/name
Description   update author name
Acess         PUBLIC
Parameter     id
Methods       PUT
*/
booky.put("/author/update/name/:id" ,(req,res)=>{
    database.authors.forEach((author)=>{
       if(author.id === parseInt(req.params.id)){
        author.name = req.body.newAuthorName;
        return;
       }
    });
    return res.json({author:database.authors})
});



/* 
Route          /publication/update/name
Description   update publication name
Acess         PUBLIC
Parameter     id
Methods       PUT
*/
booky.put("/publication/update/name/:id", (req,res)=>{
    database.publications.forEach((publication)=>{
        if(publication.id === parseInt(req.params.id)){
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return res.json({publication: database.publications})
});


/* 
Route          /publication/update/book
Description   update/add books to publication
Acess         PUBLIC
Parameter     id, isbn
Methods       PUT
*/
booky.put("/publication/update/book/:id/:isbn" ,(req,res)=>{

    //update publication
    database.publications.forEach((publication)=>{
        if(publication.id === parseInt(req.params.id)){
            publication.books.push(req.params.isbn);
            return;
        }
    });

   //update books
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            book.publications.push(parseInt(req.params.id));
            return;
        }
    });
    return res.json({publication:database.publications , book:database.books});
})


// /*  assuming that publication is not an array we are trying to replace the publication value in books */
 
// /*
// Route          /publication/update/book
// Description   update/add books to publication
// Acess         PUBLIC
// Parameter     isbn
// Methods       PUT
// */
// booky.put("/publication/update/book/:isbn",(req,res)=>{
     
//     //uptade the publication database
//     database.publications.forEach((publication)=>{
//         if(publication.id === req.body.pubId){
//          return publication.books.push(req.params.isbn);
//         }
//     });

//     //update the book database
//     database.books.forEach((book)=>{
//        if(book.ISBN === req.params.isbn){
//         book.publications = req.body.pubId;
//         return;
//        } 
//     });
//     return res.json({books:database.books , publication:database.publications, message: "successfully updated publication"
// });
// });



/* 
Route          /book/delete
Description   delete a book
Acess         PUBLIC
Parameter     isbn
Methods       DELETE
*/
booky.delete("/book/delete/:isbn" ,(req,res)=>{
    const updatedBookDatabase = database.books.filter(
        (book)=>book.ISBN !== req.params.isbn
    );
    database.books = updatedBookDatabase;
    return res.json({books:database.books , message:"sucessfully deleted a book"});
});



/* 
Route          /book/delete/author
Description   delete a author from a book
Acess         PUBLIC
Parameter     isbn,authorId
Methods       DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req,res)=>{
    
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newAuthorList = book.author.filter(
                (author) => author !== parseInt(req.params.authorId)
                ); 
                book.author = newAuthorList;
                return;
        }
    });

    //update author database
    database.authors.forEach((author)=>{
        if(author.id === parseInt(req.params.authorId)){
            const newBooksList = author.books.filter(
                (book) => book !== req.params.isbn
            );
              author.books = newBooksList;
              return;
        }
    });
    return res.json({book:database.books , author: database.authors , message:"author was deleted"})
});


/* 
Route          /author/delete
Description   delete a author 
Acess         PUBLIC
Parameter     id
Methods       DELETE
*/
booky.delete("/author/delete/:id" , (req,res)=>{
    const updatedAuthorDatabase =  database.authors.filter(
      (author)=> author.id !== parseInt(req.params.id)
    );
      database.authors = updatedAuthorDatabase;
      return res.json({author:database.authors, message:"author was deleted"});
});


/* 
Route          /publication/delete
Description   delete a author 
Acess         PUBLIC
Parameter     id
Methods       DELETE
*/
booky.delete("/publication/delete/:id", (req,res)=>{
    const updatedPublicationDatabase = database.publications.filter(
        (publication)=>publication.id !== parseInt(req.params.id)
    );
    database.publications = updatedPublicationDatabase;
    return res.json({publication:database.publications, message:"publication was deleted"});

});


/* 
Route          /publication/delete/book
Description   delete a book from a publication
Acess         PUBLIC
Parameter     pubId,isbn
Methods       DELETE
*/
booky.delete("/publication/delete/book/:pubId/:isbn", (req,res)=>{

    //update publication database
    database.publications.forEach ((publication)=>{
        if (publication.id === parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter(
                (books)=> books !== req.params.isbn
            );
            publication.books = newBooksList;
            return;
        }
    });

    // update books database
    database.books.forEach((book)=>{
        if(book.ISBN === req.params.isbn){
            const newPublicationsList = book.publications.filter(
                (publication) => publication !== parseInt(req.params.pubId)
            );
            book.publications = newPublicationsList;
            return;
        }
          
    });
    return res.json({publication:database.publications, book: database.books, message:"book was sucessfully deleted from publication"})

});

// /*
// delete a book from publication and we are assuming that publication is not an array just an single value so when we are trying to delete the publication value in books database we do it by replacing it with value 0

// Route          /publication/delete/book
// Description   delete a book from a publication
// Acess         PUBLIC
// Parameter     pubId,isbn
// Methods       DELETE
// */
// booky.delete("/publication/delete/book/:isbn/:pubId", (req,res)=>{
//      // update publication database
//      database.publications.forEach((publication)=>{
//         if(publication.id === parseInt(req.params.pubId)){
//             const newBooksList = publication.books.filter(
//                 (book)=> book !== req.params.isbn
//             );
//             publication.books = newBooksList;
//             return;
//         }
//      });

//      // update books database
//      database.books.forEach((book)=>{
//         if(book.ISBN === req.params.isbn){
//             book.publications =0; // no publication available
//             return;
//         }
//      });
//      return res.json({books:database.books , publication:database.publications})
// });



booky.listen(3000, ()=> console.log("hey server is running 🚀"))


// we need some one who talk to mangodb in which mangodb can understand => and also talk to us so that we can also understand ,we understand js so we need someone take our code and give to mangodb understandable language tht is mangoose