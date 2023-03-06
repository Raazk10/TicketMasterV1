import eventInformation from "./eventInformation.js";
import { clientId } from "../env.js";
const baseUrl = "https://app.ticketmaster.com/discovery/v2/events/";

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get("id");
const url = `${baseUrl}${eventId}.json?apikey=${clientId}`;
const eventDetailContainer = document.querySelector(".event-card__details");

export default async function getEventDetails() {
  eventInformation();
  console.log(eventId);
  const response = await fetch(url);
  const result = await response.json();
  console.log(result);

  //console.log(events);

  if (!result) {
    throw new Error(`Could not find event with ID ${eventId}`);
  }
  const eventElement = document.querySelector(".event-card__name");
  eventElement.textContent = result.name;

  const eventInfoBackground = document.querySelector(
    ".event__info__background"
  );

  const imageElement = document.createElement("img");
  imageElement.classList.add("event-card__image");
  const image = result.images.find((image) => image.width >= 500);
  if (image) {
    imageElement.src = image.url;
    eventInfoBackground.style.backgroundImage = `url(${image.url})`;
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "image not found";
    eventDetailContainer.appendChild(errorMessage);
    return;
  }

  // append element to main container
  eventDetailContainer.appendChild(imageElement);
  eventDetailContainer.appendChild(eventElement);

  // list details
  const eventListElement = document.querySelector(".event__list");

  const eventTableRow = document.createElement("tr");

  // date
  const eventDateCell = document.createElement("td");
  eventDateCell.textContent = `${result.dates?.start?.localDate}`;
  eventTableRow.appendChild(eventDateCell);

  // event name
  const eventNameCell = document.createElement("td");
  eventNameCell.textContent = result.name;
  eventTableRow.appendChild(eventNameCell);

  // venue
  const eventVenueCell = document.createElement("td");
  eventVenueCell.textContent = result._embedded?.venues?.[0].name;
  eventTableRow.appendChild(eventVenueCell);

  // city
  const eventCityCell = document.createElement("td");
  eventCityCell.textContent = result._embedded?.venues?.[0].city.name;
  eventTableRow.appendChild(eventCityCell);

  // add button to the row
  const eventButton = document.createElement("td");
  const buttonTicket = document.createElement("button");
  buttonTicket.classList.add("buy-ticket-button");
  buttonTicket.textContent = "Buy Tickets";
  buttonTicket.addEventListener("click", () => {
    window.location.href = result.url;
  });
  eventButton.appendChild(buttonTicket);
  eventTableRow.appendChild(eventButton);

  eventListElement.appendChild(eventTableRow);
}
