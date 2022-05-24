// Add Book to Shelf
function newBook() {
  const titleBook = document.getElementById("inputBookTitle").value;
  const authorBook = document.getElementById("inputBookAuthor").value;
  const yearBook = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;

  const bookObject = generateBookObject(
    titleBook,
    authorBook,
    yearBook,
    isCompleted,
    false
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(BOOKSHELF_EVENT));
  saveDataToLocalStorage();
}

function createBook(bookObject) {
  const dataTitle = document.createElement("h3");
  dataTitle.innerHTML = bookObject.title;

  const dataAuthor = document.createElement("p");
  dataAuthor.innerText = "Penulis : " + bookObject.author;

  const dataYear = document.createElement("p");
  dataYear.innerText = "Tahun Terbit : " + bookObject.year;

  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title-action");
  titleContainer.append(dataTitle, dataAuthor, dataYear);

  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("action");

  if (bookObject.isCompleted) {
    // Button Undo
    const undoButton = createUndoButton();
    undoButton.addEventListener("click", function () {
      undoBookFromShelf(bookObject.id);
    });

    // Button Delete with Custom Dialog
    const removeButton = createRemoveButton();
    removeButton.addEventListener("click", function () {
      let dialogId = document.getElementById("dialog-id");
      dialogId.setAttribute("style", "display: block;");

      const cancelBox = document.querySelector(".btnbox-cancel");
      const deleteBox = document.querySelector(".btnbox-delete");
      cancelBox.onclick = function () {
        dialogId.setAttribute("style", "display: none;");
      };
      deleteBox.onclick = function () {
        removeBookFromShelf(bookObject.id);
        dialogId.setAttribute("style", "display: none;");
      };
    });

    buttonContainer.append(undoButton, removeButton);
  } else {
    // Button Done
    const doneButton = createDoneButton();
    doneButton.addEventListener("click", function () {
      doneBookFromShelf(bookObject.id);
    });

    // Button Delete with Custom Dialog
    const removeButton = createRemoveButton();
    removeButton.addEventListener("click", function () {
      let dialogId = document.getElementById("dialog-id");
      dialogId.setAttribute("style", "display: block;");

      const cancelBox = document.querySelector(".btnbox-cancel");
      const deleteBox = document.querySelector(".btnbox-delete");
      cancelBox.onclick = function () {
        dialogId.setAttribute("style", "display: none;");
      };
      deleteBox.onclick = function () {
        removeBookFromShelf(bookObject.id);
        dialogId.setAttribute("style", "display: none;");
      };
    });

    buttonContainer.append(doneButton, removeButton);
  }

  const container = document.createElement("article");
  container.classList.add("book_item");
  container.append(titleContainer, buttonContainer);
  container.setAttribute("id", `book-itemid-${bookObject.id}`);

  return container;
}

// Create Button Undo, Done, & Remove
function createButton(classButton, textButton) {
  const button = document.createElement("button");
  button.classList.add(classButton);
  button.innerText = textButton;
  return button;
}

function createDoneButton() {
  return createButton("btn-green", "Selesai");
}

function createUndoButton() {
  return createButton("btn-green", "Undo");
}

function createRemoveButton() {
  return createButton("btn-red", "Hapus");
}
