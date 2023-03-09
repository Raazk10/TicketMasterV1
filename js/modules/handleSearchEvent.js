import fetchEventSearch from "./fetchEventSearch.js";
import renderSearchEvent from "./renderSearchEvent.js";
import { handleError } from "./fetchEventSearch.js";

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
    if (searchedValue) {
      warningElement.classList.add("hidden"); // Hide warning message
      warningElement.textContent = ""; // Clear warning message
      renderSearchEvent(searchedValue);
      searchInput.value = "";
    } else {
      handleError(error);
    }
  }
}
