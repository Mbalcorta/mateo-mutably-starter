console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  // code in here
  $('#getAllBooks').on('click', function getAllBooksJson(e){
    $("#all-books").toggle()
    fetch('https://mutably.herokuapp.com/books').then((response) => {
      const contentType = response.headers.get('content-type');
      if(contentType && contentType.includes('application/json')) {
        return response.json()
      }
      throw new TypeError('oops, we haven\'t got JSON!')
    }).then((bookObject) =>{
      const allBooks = bookObject.books
      $('.list-group').append('<div id="all-books"></div>')
        allBooks.forEach((bookObj) => {
         const book = `
          <img src=${bookObj.image}>
          <div>Title: ${bookObj.title}</div>
          <div>Author: ${bookObj.author}</div>
        `
        $('#all-books').prepend(book)
      })
    })
  })


});
