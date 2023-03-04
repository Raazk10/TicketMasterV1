const apiKey = "aLGf7LIEfrlaEtpVXyO5Oj9InyDNM8gN";
const baseUrl = "https://app.ticketmaster.com/discovery/v2/events/";

export default async function getEventDetails() {
  const eventDetailContainer = document.querySelector(".eventDetails");
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("id");

  /* const url = `${baseUrl}${eventId}.json?apikey=${apiKey}`; */
  const url = `https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=aLGf7LIEfrlaEtpVXyO5Oj9InyDNM8gN`;
  console.log(eventId);
  const response = await fetch(url);
  const result = await response.json();
  /*  const data = data._embedded?.events?.[0]; */
  if (!result) {
    throw new Error(`Could not find event with ID ${eventId}`);
  }
  const eventElement = document.createElement("p");
  eventElement.classList.add("event__name");
  eventElement.textContent = `Event: ${result.name}`;

  const dateElement = document.createElement("p");
  dateElement.classList.add("event__date");
  dateElement.textContent = `startDate: ${result.dates.start.localDate}`;

  const imageElement = document.createElement("img");
  imageElement.classList.add("card__image");
  const image = result.images.find((image) => image.width >= 500);
  if (image) {
    imageElement.src = image.url;
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "image not found";
    eventDetailContainer.appendChild(errorMessage);
    return;
  }

  eventDetailContainer.appendChild(imageElement);
  eventDetailContainer.appendChild(eventElement);
  eventDetailContainer.appendChild(dateElement);
  /*  return {
    name: event.name,
    id: event.id,
    date: event.dates?.start?.localDate,
    time: event.dates?.start?.localTime,
    venue: event._embedded?.venues?.[0]?.name,
    city: event._embedded?.venues?.[0]?.city?.name,
    state: event._embedded?.venues?.[0]?.state?.name,
    country: event._embedded?.venues?.[0]?.country?.name,
    address: event._embedded?.venues?.[0]?.address?.line1,
    postalCode: event._embedded?.venues?.[0]?.postalCode,
    imageUrl: event.images?.[0]?.url,
    description: event?.info?.description,
  }; */
}

/* function showEventDetails(eventDetails) {
  // Populate the placeholders in your event detail HTML file

 
 
  const timeElement = document.querySelector(".event__time");
  const venueElement = document.querySelector(".event__venue");
  const cityElement = document.querySelector(".event__city");
  const stateElement = document.querySelector(".event__state");
  const countryElement = document.querySelector(".event__country");
  const addressElement = document.querySelector(".event__address");
  const postalCodeElement = document.querySelector(".event__postal-code");
  const imageElement = document.querySelector(".event__image");
  const descriptionElement = document.querySelector(".event__description");

  nameElement.textContent = eventDetails.name;
  dateElement.textContent = eventDetails.date;
  timeElement.textContent = eventDetails.time;
  venueElement.textContent = eventDetails.venue;
  cityElement.textContent = eventDetails.city;
  stateElement.textContent = eventDetails.state;
  countryElement.textContent = eventDetails.country;
  addressElement.textContent = eventDetails.address;
  postalCodeElement.textContent = eventDetails.postalCode;
  imageElement.src = eventDetails.imageUrl || "placeholder.jpg";
  imageElement.alt = eventDetails.name;
  descriptionElement.textContent =
    eventDetails.description || "No description available.";
}
 */
