export default function RenderEvent(events) {
  const ulElement = document.querySelector(".card__container");

  console.log(events);

  events.forEach((event) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

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
    textElement.textContent = `${events.indexOf(event) + 1} Event`;

    /*  ulImage.src = event.img; */

    cardContent.appendChild(titleElement);
    cardContent.appendChild(textElement);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(cardContent);

    ulElement.appendChild(cardElement);
    console.log(event);
  });
}
