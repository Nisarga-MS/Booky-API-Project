let books = [
  {
    ISBN: "12345Book",
    title: "Getting started with MERN",
    pubDate: "2023-15-11",
    language: "en",
    numPage: 350,
    author: [1, 2],
    publications: [1],
    category: ["tech", "programming", "education", "thriller"],
  },
];

const authors = [
  {
    id: 1,
    name: "pavan",
    books: ["12345Book", "123456789Secret"],
  },
  {
    id: 2,
    name: "shaurya",
    books: ["12345Book"],
  },
];

const publications = [
  {
    id: 1,
    name: "writex",
    books: ["12345Book","123456789Secret"],
  },
];

// data in this file can be shared by using this export method
module.exports ={books, authors, publications};
