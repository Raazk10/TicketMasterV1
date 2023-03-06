const ulElement = document.querySelector(".card__container");
const contentHeading = document.querySelector(".content__heading");

export default function renderSearchEvent(searchedValue) {
  //count the total numbet of events
  const totalEvents = searchedValue.length;
  // update the content heading with the total count
  contentHeading.textContent = `${totalEvents} events in this area`;

  const cardElements = searchedValue.map((event, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.eventId = event.id;
    cardElement.addEventListener("click", () => {
      const eventId = cardElement.dataset.eventId;
      window.location.href = `/eventDetails.html?id=${eventId}`;
    });

    const cardContent = document.createElement("div");
    cardContent.classList.add("card__content");

    const imageElement = document.createElement("img");
    imageElement.classList.add("card__image");
    imageElement.setAttribute("src", event.img);

    const titleElement = document.createElement("h2");
    titleElement.classList.add("card__title");
    titleElement.textContent = event.name;

    const textElement = document.createElement("p");
    textElement.classList.add("card__text");
    textElement.textContent = `${index + 1} Event`;

    cardContent.appendChild(titleElement);
    cardContent.appendChild(textElement);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(cardContent);
    return cardElement;
  });

  ulElement.innerHTML = "";
  ulElement.append(...cardElements);
}
