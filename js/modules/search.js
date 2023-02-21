export default function SearchEvent(events) {
  const searchInput = document.querySelector(".search__input");
  const searchButton = document.querySelector(".search__button");

  searchInput.addEventListener("input", handleSearchEvent);

  function handleSearchEvent() {
    const suggestion = searchInput.value;
    console.log(suggestion);

    events.forEach((event) => {
      const suggest = document.createElement("div");
      suggest.classList.add("suggestion");
      const liElement = document.createElement("li");
      liElement.textContent = event.city;
    });
  }
}
