// maxlength Input Year
const yearNumber = document.getElementById("inputBookYear");
const yearMaxLength = document.getElementById("inputBookYear").maxLength;

yearNumber.addEventListener("input", function () {
  if (yearNumber.value.length > yearMaxLength) {
    yearNumber.value = yearNumber.value.slice(0, yearMaxLength);
  }
});

// Checkbox isComplete
const checkIsCompleted = document.querySelector("#inputBookIsComplete");
const spanButton = document.querySelector("#spanCheck");

checkIsCompleted.addEventListener("change", function () {
  if (checkIsCompleted.checked) {
    spanButton.innerText = "Rak Selesai Dibaca";
  } else {
    spanButton.innerText = "Rak Belum Selesai Dibaca";
  }
});

// Search Book Title
function titleSearch() {
  const searchClick = document.getElementById("searchSubmit");

  searchClick.addEventListener("click", function (event) {
    const searchInput = document
      .getElementById("searchBookTitle")
      .value.toUpperCase();
    const titleList = document.getElementsByClassName("book_item");

    let index = 0;
    while (index < titleList.length) {
      const title = titleList[index].getElementsByTagName("h3");
      if (title[0].innerHTML.toUpperCase().indexOf(searchInput) > -1) {
        titleList[index].setAttribute("style", "display: flex;");
      } else {
        titleList[index].setAttribute("style", "display: none;");
      }
      index++;
    }
    console.log("Pencarian Judul Buku ditemukan.");
    event.preventDefault();
  });
}

// Navbar
const hamburgerIcon = document.querySelector(".menuHamburger");
const navItem = document.querySelector(".nav-bar");

hamburgerIcon.addEventListener("click", function () {
  hamburgerIcon.classList.toggle("active");
  navItem.classList.toggle("active");
});
