import { clientId } from "../env.js";
const url = `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${clientId}&locale=*&keyword=`;

export default async function fetchEventSearch(query) {
  const response = await fetch(`${url}${query}`);
  const result = await response.json();
  console.log(result);

  const events = result._embedded?.events?.map((event) => {
    return {
      name: event.name,
      id: event.id,
      venue: event._embedded?.venues?.[0]?.name,
      city: event._embedded?.venues?.[0].city?.name,
      img: event.images?.[0]?.url,
      date: event.dates?.start,
    };
  });
  return events;
}
