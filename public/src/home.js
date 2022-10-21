const { setArrayLength, findBookById } = require("./books");

function getTotalBooksCount(books = []) {
  //Goal: return a _number_ that represents the number of book objects inside of the array.
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  //Goal: Return a _number_ that represents the number of account objects inside of the array.
  //return accounts.length;
  const mappedAccounts = accounts.map((account)=> account.id);
  return mappedAccounts.length;
}

function getBooksBorrowedCount(books) {
  //Goal: It returns a _number_ that represents the number of books _that are currently 
  //checked out of the library._ This number can be found by looking at the first 
  //transaction object in the `borrows` array of each book. If the transaction says the 
  //book has not been returned (i.e. `returned: false`), the book is currently being 
  //borrowed.
  let counter = 0;
  const borroweredBooks = books.reduce((total, book)=> {
    const borrowsforBook = book.borrows;
    if (Object.values(borrowsforBook[0]).includes(false)) {
      counter ++;
    }
    return total;
  }, 0)
  return counter; 
}

function getMostCommonGenres(books) {
  //Goal: It returns an array containing five objects or fewer that represents the most 
  //common occurring genres, ordered from most common to least. Each object in the returned
  //array has two keys: The `name` key which represents the name of the genre. 
  //The `count` key which represents the number of times the genre occurs.
  //Even if there is a tie, the array should only contain no more than five objects.
  
  let results = [];
  books.forEach((book)=> {
    //checking to see if this genre is already in our result array
    const checkedGenres = results.filter((result)=>result.name === book.genre)
    //if it is not then we must add it
    if (checkedGenres.length === 0) {
      let newResult = {name: book.genre, count: 1}
      results.push(newResult);
    }
    //if it is we must increment counter
    else {
      const findMatchingIndex = (result)=> result.name === book.genre;
      const genreIndex = results.findIndex(findMatchingIndex);
      const newResult = {name: book.genre, count: results[genreIndex].count+1}
      results[genreIndex]= newResult;
    } 
  });
  /*
  ['Historical Fiction', 'Science', 'Classics', 'Travel', 'Young Adult', 'Nonfiction',
  'Classics', 'Science', 'Science']
  */
  //sorting with most common genres in descending order
  const sortedGenres = results.sort((a,b)=> a.count < b.count ? 1 : -1);
  //make sorted list length of 5
  //const sortedGenresLength5 = sortedGenres.slice(0, 5);
  const sortedGenresLength5 = setArrayLength(sortedGenres, 5);
  return sortedGenresLength5; 

}


function getMostPopularBooks(books) {
  //Goal: It returns an array containing five objects or fewer that represents the most 
  //popular books in the library. Popularity is represented by the number of times a book 
  //has been borrowed. Each object in the returned array has two keys:
  //The `name` key which represents the title of the book.
  //The `count` key which represents the number of times the book has been borrowed.
  //Even if there is a tie, the array should only contain no more than five objects.
  let results = [];
  books.forEach((book)=> {
    const newResultObject = {name: book.title, count: book.borrows.length}
    results.push(newResultObject);
  });
  const sortedTitles = results.sort((a,b)=> a.count < b.count ? 1 : -1);
  const length5SortedTitles = sortedTitles.slice(0, 5);
  //console.log(length5SortedTitles);
  return length5SortedTitles;
}

function getMostPopularAuthors(books, authors) {
  //Goal: It returns an array containing five objects or fewer that represents the most 
  //popular authors whose books have been checked out the most. Popularity is represented 
  //by finding all of the books written by the author and then adding up the number of 
  //times those books have been borrowed.

  let results = [];
  //helper function that takes authoerId and counts
  books.forEach((book)=> {
    let indexOfAuthor = authors.findIndex((author)=> author.id === book.authorId);
    let authorFullName = Object.values(authors[indexOfAuthor].name);
    let authorNameString = authorFullName.join(" ");
    //console.log(authorNameString);
    //console.log(authorFullName);
    const checkedAuthors = results.filter((result)=> result.name === authorNameString);
    if (checkedAuthors.length === 0) {
      let borrowsByBook = book.borrows.length;
      let newResult = {name: authorNameString, count: borrowsByBook}
      results.push(newResult);
    }
    else {
      const findMatchingIndex = ((result)=> result.name === authorNameString);
      const resultingAuthorIndex = results.findIndex(findMatchingIndex);
      let borrowsByBooks = book.borrows.length;
      const newResult = {name: authorNameString, count: results[resultingAuthorIndex].count+borrowsByBooks}
      results[resultingAuthorIndex] = newResult;
    }
  });
  const sortedAuthors = results.sort((a,b)=> a.count < b.count ? 1 : -1);
  const length5sortedAuthors = sortedAuthors.slice(0, 5);
  return length5sortedAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
