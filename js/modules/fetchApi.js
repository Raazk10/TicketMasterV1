const apiKey = "aLGf7LIEfrlaEtpVXyO5Oj9InyDNM8gN";

const baseUrl = "https://app.ticketmaster.com/discovery/v2/";
const url = `${baseUrl}/events.json?&apikey=${apiKey}&locale=*&keyword='Oslo'`;

export default async function fetchApi(query) {
  const response = await fetch(url);

  const result = await response.json();

  const events = result._embedded?.events.map((event) => {
    const image = event?.images?.[0]?.url;
    return {
      name: event.name,
      id: event.id,
      venue: event._embedded?.venues[0]?.name,
      city: event._embedded?.venues[0]?.city?.name,
      img: image,
    };
  });
  return events;
}
