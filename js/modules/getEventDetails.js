import showHideInfo from "./showHideInfo.js";
import showHideAttraction from "./showHideAttraction.js";
import { clientId } from "../env.js";

const baseUrl = "https://app.ticketmaster.com/discovery/v2/events/";

const eventDetailContainer = document.querySelector(".event-card__details");
const urlParams = new URLSearchParams(window.location.search);
// get id from event and passed through second page to get event details

const eventId = urlParams.get("id");
const eventIdurl = `${baseUrl}${eventId}.json?apikey=${clientId}`;

export default async function getEventDetails() {
  showHideInfo();
  showHideAttraction();

  const result = await fetchEventDetails(eventIdurl);
  renderHtml(result);
  renderInformationPage(result);
  renderShowAttraction(result);
}
// get data from api with matching id
async function fetchEventDetails(eventIdurl) {
  const response = await fetch(eventIdurl);
  const result = await response.json();
  return result;
}

// render data in the html
function renderHtml(result) {
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
  buttonTicket.textContent = "Buy tickets";
  buttonTicket.addEventListener("click", () => {
    window.location.href = result.url;
  });
  eventButton.appendChild(buttonTicket);
  eventTableRow.appendChild(eventButton);

  eventListElement.appendChild(eventTableRow);
}

// list all attraction name when clicked on down arrow
function renderShowAttraction(results) {
  const attractionParentElement = document.querySelector(".list__Attraction");

  const lineupAttraction = document.createElement("ul");
  results._embedded.attractions.forEach((result) => {
    const attractionItem = document.createElement("li");
    attractionItem.textContent = `- ${result.name}`;
    lineupAttraction.appendChild(attractionItem);
  });
  attractionParentElement.appendChild(lineupAttraction);
}

function renderInformationPage(result) {
  // query selector

  const eventNameElement = document.querySelector(
    ".event__information-eventName"
  );
  const eventTimeElement = document.querySelector(".event__information-time");
  const eventDateElement = document.querySelector(".event__information-date");
  const eventVenueElement = document.querySelector(".event__information-venue");

  const eventDescriptionElement = document.querySelector(
    ".event__information-description"
  );

  const organizerElement = document.querySelector(".organizer");

  const eventPriceDetailElement = document.querySelector(
    ".event__information-price-detail"
  );
  const eventPriceDetailElement1 = document.querySelector(
    ".event__information-price-detail1"
  );
  const eventTicketInfoElement = document.querySelector(
    ".event__information-ticketLimit-information"
  );

  // render text
  eventNameElement.textContent = result.name;
  eventTimeElement.textContent = result.dates.start.localTime;
  eventDateElement.textContent = result.dates.start.localDate;
  eventVenueElement.textContent = result._embedded.venues?.[0].name;
  eventDescriptionElement.textContent = result.description
    ? result.description
    : "No description available at the moment";

  if (result.url) {
    organizerElement.href = result.url;
    organizerElement.target = "_blank";
  } else {
    organizerElement.textContent = "No organizer information available";
  }

  eventPriceDetailElement.textContent = result.priceRanges?.[1]
    ? `${result.priceRanges[1].min} ${result.priceRanges[1].currency}-${result.priceRanges[1].max} ${result.priceRanges[1].currency} ${result.priceRanges[1].type}`
    : "No price details available";

  eventPriceDetailElement1.textContent = result.priceRanges?.[0]
    ? `${result.priceRanges[0].min} ${result.priceRanges[0].currency}-${result.priceRanges[0].max} ${result.priceRanges[0].currency} ${result.priceRanges[0].type}`
    : "Please check again later.";

  eventTicketInfoElement.textContent = result.ticketLimit?.info
    ? result.ticketLimit.info
    : "No ticket info available at the moment";
}
