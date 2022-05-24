document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");
  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    newBook();
  });
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

const books = [];
const BOOKSHELF_EVENT = "event-bookshelf";

function generateBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isCompleted,
  };
}

document.addEventListener(BOOKSHELF_EVENT, function () {
  const uncompletedShelf = document.getElementById("incompleteBookshelfList");
  const completedShelf = document.getElementById("completeBookshelfList");
  uncompletedShelf.innerHTML = "";
  completedShelf.innerHTML = "";

  for (bookItem of books) {
    const bookElement = createBook(bookItem);
    if (bookItem.isCompleted) {
      completedShelf.append(bookElement);
    } else {
      uncompletedShelf.append(bookElement);
    }
  }
});

function findBook(bookID) {
  for (bookItem of books) {
    if (bookItem.id === bookID) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookID) {
  for (index in books) {
    if (books[index].id === bookID) {
      return index;
    }
  }
  return -1;
}

function doneBookFromShelf(bookID) {
  const bookShelf = findBook(bookID);
  if (bookShelf == null) {
    return;
  }
  bookShelf.isCompleted = true;

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataToLocalStorage();
}

function undoBookFromShelf(bookID) {
  const bookShelf = findBook(bookID);
  if (bookShelf == null) {
    return;
  }
  bookShelf.isCompleted = false;

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataToLocalStorage();
}

function removeBookFromShelf(bookID) {
  const bookShelf = findBookIndex(bookID);
  if (bookShelf === -1) {
    return;
  }
  books.splice(bookShelf, 1);

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataToLocalStorage();
}

// Web Storage
const STORAGE_KEY = "BOOKSHELF_APPS";

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser anda tidak mendukung local storage");
    return false;
  }
  return true;
}

function saveDataToLocalStorage() {
  if (isStorageExist()) {
    const bookString = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, bookString);
    console.log(
      "Data berhasil diupdate pada local storage.",
      localStorage.getItem(STORAGE_KEY)
    );
  }
}

function loadDataFromStorage() {
  const getDataStorage = localStorage.getItem(STORAGE_KEY);
  let bookParse = JSON.parse(getDataStorage);
  if (bookParse !== null) {
    for (item of bookParse) {
      books.push(item);
    }
  }
  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
}
