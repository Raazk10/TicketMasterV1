import { clientId } from "../env.js";
const url = `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${clientId}&size=50&locale=*&keyword=`;

export default async function fetchEventSearch(query) {
  try {
    const response = await fetch(`${url}${query}`);
    const events = await handleResponse(response);
    if (events.length === 0) {
      return null;
    }
    return events;
  } catch (error) {
    handleError(error);
  }
}

async function handleResponse(response) {
  if (response.ok) {
    const result = await response.json();
    console.log(result);
    return result._embedded?.events?.map((event) => {
      return {
        name: event.name,
        id: event.id,
        venue: event._embedded?.venues?.[0]?.name,
        city: event._embedded?.venues?.[0].city?.name,
        img: event.images?.[0]?.url,
        date: event.dates?.start,
      };
    });
  } else if (response.status === 400) {
    throw new Error("Something wrong with api url");
  } else if (response.status === 404) {
    throw new Error("Url not existing");
  } else if (response.status === 401) {
    throw new Error("Not authorized user");
  } else if (response.status >= 500) {
    throw new Error("Server not responding");
  } else {
    throw new Error("No events found try again");
  }
}
export function handleError(error) {
  const warningElement = document.querySelector(".warning");
  warningElement.classList.remove("hidden");
  warningElement.textContent = error.message;
}
