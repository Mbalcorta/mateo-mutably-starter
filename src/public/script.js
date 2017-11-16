console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  const getAllBooks = () => {
    fetch('https://mutably.herokuapp.com/books').then((response) => {
      const contentType = response.headers.get('content-type');
      if(contentType && contentType.includes('application/json')) {
        return response.json()
      }
      throw new TypeError('oops, we haven\'t got JSON!')
    }).then((bookObject) => {
      const allBooks = bookObject.books
      $('.list-group').append('<div id="all-books"></div>')
      $('#all-books').html('')

        allBooks.forEach((bookObj) => {
         const book = `
          <img src=${bookObj.image}>
          <div>Title: ${bookObj.title}</div>
          <div>Author: ${bookObj.author}</div>
          <div>Release Date: ${bookObj.releaseDate}</div>
          <button id="edit" class="btn-block btn btn-primary">Edit</button>
        `
        $('#all-books').prepend(book)

      })
    })
  }

  const addNewBook = () => {
    fetch('https://mutably.herokuapp.com/books', {
      method:'post',
      headers : {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        title: $('#book-title').val(),
        author: $('#book-author').val(),
        image: $('#book-image').val(),
        releaseDate: $('#book-release-date').val()
      })
    }).then((response) => {
      console.log(response)
    })
  }



  // event handlers
  $('#getAllBooks').on('click', function(e){
    $('.error').remove()
    $('#all-books').toggle()
    getAllBooks()
  })

  $('#addNewBook').on('click', function (e){
    if($('#book-title').val() && $('#book-author').val() && $('#book-image').val() && $('#book-release-date').val()){
      addNewBook()
    } else {
      $('.error').remove()
      $('#addNewBook').before('<div class=error></div>')
      $('.error').html('Please fill in all fields above')
    }
  })

  $('.list-group').on('click', '#edit', function(){
    if($(this).hasClass('btn-primary')){
      $(this).html('Save')
      $(this).removeClass('btn-primary')
      $(this).addClass('btn-success')
    } else {
      $(this).html('Edit')
      $(this).removeClass('btn-success')
      $(this).addClass('btn-primary')
    }
  })
});
