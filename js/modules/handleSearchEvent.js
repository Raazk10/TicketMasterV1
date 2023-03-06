import fetchEventSearch from "./fetchEventSearch.js";
import renderSearchEvent from "./renderSearchEvent.js";

export default function handleSearchEvent() {
  // qyery selector
  const searchInput = document.querySelector(".search__input");
  const searchForm = document.querySelector(".search");
  //event listener
  searchForm.addEventListener("submit", handleSearch);

  //method
  async function handleSearch(e) {
    e.preventDefault();
    const query = searchInput.value;
    const searchedValue = await fetchEventSearch(query);
    console.log(searchedValue);
    renderSearchEvent(searchedValue);
    searchInput.value = "";
  }
}
