import fetchApi from "./fetchApi.js";
import renderEvent from "./renderEvent.js";

//query selector
const searchButton = document.querySelector(".search__button");
const searchInput = document.querySelector(".search__input");
const searchForm = document.querySelector(".search");

export default function handleSearchEvent() {
  //event listener
  searchForm.addEventListener("submit", handleSearch);

  //method
  async function handleSearch(e) {
    e.preventDefault();
    const query = searchInput.value;
    const searchedValue = await fetchApi(query);
    renderEvent(searchedValue);
    searchInput.value = "";
  }
  // Redirect to event details page if user clicked on an event card
  const cardElements = document.querySelectorAll(".card");
  cardElements.forEach((card) => {
    card.addEventListener("click", () => {
      const eventId = card.dataset.eventId;
      window.location.href = `eventDetails.html?eventId=${eventId}`;
    });
  });
}
