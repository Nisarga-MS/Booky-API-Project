    requirements for our project

imagine that we are a book managment company

    Books
id(isbn-international standard book number) ISBN
title, pub date, langauge, num page, author[],publications[], category[]

    Authors
id,name,books[]

    Publications
id, name, books[]

 what are all the APIs that we need...

    Books
 we need an API

    GET
 to get all books✔ 📌
 to get specific books✔ 📌
 to get list of books based on category✔ 📌
 to get list of books based on languages✔ 📌

    POST --> send a data
add new book✔📌

    PUT -->update the existing data
update book title✔📌
update/add new author✔

    DELETE --> delete data
delete book✔  
delete an author from a book✔



    Authors
we need an API

    GET
to get all authors✔📌
to get specific authors✔ 📌
to get list of authors based on books✔📌

    POST
add new author✔📌

    PUT
update author name✔

    DELETE
delete an author✔


    Publication

    GET
we need an API
to get all publication✔📌
to get specific publication✔📌
to get list of publication based on books✔📌

    POST
add new publications✔📌

    PUT
update publication name✔
update/add books to publication✔

    DELETE
delete the publication✔
delete a book  from publications✔


how does the server serve the request comming from the client??


symbol  meaning : 📌 - done connecting to database , ✔ -  done creating  API related to it

