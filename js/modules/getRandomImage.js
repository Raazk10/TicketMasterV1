import { clientId } from "../env.js";

// getting random images for background
export default async function getRandomImages() {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?&apikey=${clientId}&size=50&locale=*&keyword={nirvana}&sort=random`;

  const response = await fetch(`${url}`);
  const result = await response.json();

  const images = result._embedded?.events?.map((event) => {
    return {
      img: event.images?.[0]?.url,
    };
  });

  const imageUrl = images[1].img;
  const imageElement = document.createElement("img");

  imageElement.src = imageUrl;
  document.getElementById("random-images").appendChild(imageElement);
}
