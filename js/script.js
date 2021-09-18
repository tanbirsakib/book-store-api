//-------- function for taking input and search through api------------//
const search = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  searchField.value = "";
  // fetching api //
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayBooks(data));
};
// display book function
const displayBooks = (data) => {
  const books = data.docs;
  const booksDiv = document.getElementById("books");
  booksDiv.textContent = "";
  books.forEach((book) => {
    //   creating cover page url 
    let coverUrl = ` https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    if (book.cover_i === undefined) {
      coverUrl =
        "https://www.forewordreviews.com/books/covers/muhammad-prophet-for-our-time.jpg";
    }
    const div = document.createElement("div");
    div.innerHTML = `<div class="p-2 border-2 rounded h-96">
                            <img class =
                            'w-2/3 h-4/6 mx-auto' src = "${coverUrl}">
                            <h2 class='text-center text-xl font-semibold text-purple-600'>${book.title}</h2>
                            <h3 class="text-center font-semibold">Author : ${book.author_name}</h3>
                            <h3 class="text-center">First Publish Year : ${book.first_publish_year}</h3>
                         </div>`;
    booksDiv.appendChild(div);
  });

//--------------------   error handling ----------------// 
  const bookFound = document.getElementById("book-found");
  bookFound.textContent = "";
  const divBookFound = document.createElement("div");

  if (data.numFound === 0) {
    divBookFound.innerHTML = `<h2 class="text-center">Book Found: <span class='text-green-600'>${data.numFound}</span></h2>
                    <p class="text-center">Sorry No book found by this name</p>`;
  } else {
    divBookFound.innerHTML = `<h2 class="text-center">Book Found: <span class='text-green-600'>${data.numFound}</span> Display : <span class='text-green-600'>100</span> </h2>
    <p class="text-center">Your Desire Books here</p>`;
  }
  bookFound.appendChild(divBookFound);
};
