const { forEach } = require("../../test/fixtures/authors.fixture");

function findAuthorById(authors, id) {
  //Goal: It returns the author object that has the matching ID.
  const found = authors.find((author)=> id === author.id);
  return found;
}

function findBookById(books, id) {
  //Goal; It returns the book object that has the matching ID.
  const found = books.find((book)=> id === book.id);
  return found;
}

function partitionBooksByBorrowedStatus(books) {
  //Goal: It returns an array with two arrays inside of it. One array contains book objects
  //that are not returned, and the other containing book objects that have been returned
  
  let bookUnreturnsArray = [];
  let resultArray = [];
  let bookReturnsArray = [];

  books.forEach((book)=> {
    const borrowsArray = book.borrows;
    const borrowStatus = borrowsArray[0].returned;
    if (borrowStatus === true) bookReturnsArray.push(book)
    else {bookUnreturnsArray.push(book);}
  })
  resultArray = [bookUnreturnsArray, bookReturnsArray];
  return resultArray;
}//end of main function

function getBorrowersForBook(book, accounts) {
  ///Goal: It should return an array of ten or fewer account objects that represents the 
  //accounts given by the IDs in the provided book's `borrows` array. However, each account
  // object should include the `returned` entry from the corresponding transaction object 
  //in the `borrows` array.
  //objects in here should look like account objects with embedded return status
  let resultArray = [];
  //for a particular book we want traverse through borrowers array of objects
  const borrowsArray = book.borrows;
  borrowsArray.forEach((borrow)=> {
    //for each borrow objects we want to find the corresponding id in accounts
    const matchingAccountById = accounts.find((account)=> borrow.id === account.id);
    let newResultObject = {...borrow, ...matchingAccountById};
    resultArray.push(newResultObject);
});
  const length10ResultArray = resultArray.slice(0, 10);
  return length10ResultArray;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
