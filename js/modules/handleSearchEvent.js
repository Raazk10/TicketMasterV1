import fetchEventSearch from "./fetchEventSearch.js";
import renderSearchEvent from "./renderSearchEvent.js";

export default function handleSearchEvent() {
  // qyery selector
  const searchInput = document.querySelector(".search__input");
  const searchForm = document.querySelector(".search");
  const warningElement = document.querySelector(".warning");

  //event listener
  searchForm.addEventListener("submit", handleSearch);

  //method
  async function handleSearch(e) {
    e.preventDefault();
    const query = searchInput.value;
    const searchedValue = await fetchEventSearch(query);
    try {
      if (searchedValue) {
        renderSearchEvent(searchedValue);
        searchInput.value = "";
      }
    } catch (error) {
      handleError(error);
    }
  }
}

function handleError(error) {
  console.log("something wrong");
  const warningElement = document.querySelector(".warning");
  warningElement.classList.remove("hidden");
  warningElement.textContent = error.message;
}
