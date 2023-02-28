const apiKey = "aLGf7LIEfrlaEtpVXyO5Oj9InyDNM8gN";
const baseUrl = `https://app.ticketmaster.com/discovery/v2/events/`;
const ulElement = document.querySelector(".card__container");

export default function getEventDetails() {
  ulElement.addEventListener("click", async (e) => {
    const cardElement = e.target.closest(".card");
    const eventId = cardElement.dataset.eventId;
    const urlParams = new URLSearchParams(window.location.search);
    const existingEventId = urlParams.get("eventId");
    if (eventId) {
      urlParams.set("eventId", eventId);
    } else if (existingEventId) {
      eventId = existingEventId;
    } else {
      // handle error here, no event ID found
      return;
    }
    window.location.href = `eventDetails.html?eventId=${eventId}`;
    const eventDetails = await getEventDetailsById(eventId);
    showEventDetails(eventDetails);
  });

  async function getEventDetailsById(id) {
    const url = `${baseUrl}${id}?apikey=${apiKey}&locale=*`;
    const response = await fetch(url);
    const data = await response.json();
    const event = data._embedded?.events?.[0];
    if (!event) {
      throw new Error(`Could not find event with ID ${id}`);
    }
    return {
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
    };
  }

  function showEventDetails(eventDetails) {
    // Populate the placeholders in your event detail HTML file

    const nameElement = document.querySelector(".event__name");
    const dateElement = document.querySelector(".event__date");
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
}
