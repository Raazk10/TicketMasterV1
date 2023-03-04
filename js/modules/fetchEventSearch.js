const testurl =
  "https://app.ticketmaster.com/discovery/v2/events/Z698xZb_Z17jo84?apikey=aLGf7LIEfrlaEtpVXyO5Oj9InyDNM8gN&locale=*";
const apiKey = "aLGf7LIEfrlaEtpVXyO5Oj9InyDNM8gN";
const baseUrl = `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${apiKey}&locale=*&keyword=`;

export default async function fetchEventSearch(query) {
  const response = await fetch(`${baseUrl}${query}`);
  const result = await response.json();

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
