const { findAuthorById } = require("./books");

function findAccountById(accounts, id) {
  //Goal: Return the account object that has the matching id
  //find id in accounts array of objects
  const found = accounts.find((account)=> id === account.id);
  return found;
}

function sortAccountsByLastName(accounts) {
  //Goal: Returns a sorted(alphabetically by last name) array of provided account objects.
  //sort() alphabetically by last name
  const sortedByLastName = accounts.sort((accountA, accountB)=> accountA.name.last > accountB.name.last ? 1 : -1);
  return sortedByLastName;
}

function getTotalNumberOfBorrows(account, books) {
  //Goal: Return number of times that accountid appears in any book's borrow's
        //array
  //access and store account id
  const accountId = account.id;

  const result = books.reduce((total, book)=> {
    //storing current book's borrows list
    let borrowArray = book.borrows;
    //filter through borrow list, return only borrowrs by our accountid for that book
    const filtersBorrowsByBook = borrowArray.filter((borrow)=> borrow.id === accountId);
    //add how manyy times this book was borrowered by our accountid to accumulator
    return total + filtersBorrowsByBook.length;
  }, 0);

  //return result from reduce function
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  //Goal: Return an array of book objects, including author info, for all books 
  //currently checked out by account user.

  //store acounts id
  const accountId = account.id;
  const booksWithAuthorObject = books.reduce((total, book)=> {
    //store all books currently borrowed by user
    const borrowArray = book.borrows;
    
    //list of unreturned book by any user
    //list of borrows for unreturned book by accountId
    const filtersUnreturnedByAccount = borrowArray.filter((borrow)=> borrow.id === accountId && borrow.returned === false);
    //console.log(filtersUnreturnedByAccount); 

    /* 
    Output from above code
    []
    []
    [ { id: '5f446f2ed3609b719568a415', returned: false } ]
    []
    []
    []
    []
    []
    [] 
    */

    //get all authors for borrowed books
    //const authors = borrowArray.filter((borrow)=> borrow.returned === false);

    
    if (filtersUnreturnedByAccount.length === 0) {
      return total;
    }

    else {
      let newBook = book;
      //using helper function
      newBookAuthor = findAuthorById(authors, book.authorId);
      //newBookAuthor = authors.find(function(author) { return author.id === book.authorId; });
      //console.log(newBookAuthor);
      /* Output from line of code above
      { id: 10, name: { first: 'Giles', last: 'Barlow' } }
      */

      newBook = {
        id: book.id,
        title: book.title,
        genre: book.genre,
        authorId: book.authorId,
        author: newBookAuthor,
      }
      //console.log(newBook);
      /*Output from line of code above
      {
        id: '5f4471329627160be1e8ce92',
        title: 'esse ea veniam non occaecat',
        genre: 'Classics',
        authorId: 10,
        author: { id: 10, name: { first: 'Giles', last: 'Barlow' } }
      }
      */
      total.push(newBook);
    }
    return total;


  }, []);
  return booksWithAuthorObject;
  
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
