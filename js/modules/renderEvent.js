const ulElement = document.querySelector(".card__container");

export default function renderEvent(searchedValue) {
  const cardElements = searchedValue.map((event, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.eventId = event.id;

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
