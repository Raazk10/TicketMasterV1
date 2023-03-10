export default function showHideInfo() {
  // query selector
  const informationButton = document.querySelector(
    ".event-card__details-button"
  );
  const backButton = document.querySelector(".backicon");
  const eventInformation = document.querySelector(".event__information");

  // event listener
  informationButton.addEventListener("click", showInformationPage);
  backButton.addEventListener("click", hideInformationPage);

  //method

  function showInformationPage() {
    eventInformation.classList.add("event__information-visible");
  }

  function hideInformationPage() {
    eventInformation.classList.remove("event__information-visible");
  }
}
