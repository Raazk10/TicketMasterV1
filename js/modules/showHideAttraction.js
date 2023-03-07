export default function showHideAttraction() {
  // query selector
  const showAttractionButton = document.querySelector(".showAttraction-button");

  const listAttraction = document.querySelector(".list__Attraction");

  //event listener
  showAttractionButton.addEventListener("click", showlineUp);

  //method
  function showlineUp() {
    listAttraction.classList.toggle("visible");
  }
}
