export default function Header() {
  let navigationVisible = false;
  /* query selectors */
  const header = document.querySelector(".header");
  const headerNavigation = document.querySelector(".header__navigation");
  const headerMenuButton = document.querySelector(".header__menu-button");
  const menuIcon = document.querySelector(".header__menu-icon");

  /* event listener */
  if (header != null) {
    //check if the headerMenuButton element exists
    headerMenuButton?.addEventListener("click", handleMenuButtonClick);
  }

  /* event handler */

  function handleMenuButtonClick(event) {
    toggleNavigationVisibility();
    renderHTML();
    toggleMenuIcon();
  }

  /* methods */
  /**
   * The ! (not) operator inverts the value of the boolean expression. If navigationVisible is true, !navigationVisible will evaluate to false, and if navigationVisible is false, !navigationVisible will evaluate to true.
   */
  function toggleNavigationVisibility() {
    navigationVisible = !navigationVisible;
  }
  function renderHTML() {
    if (navigationVisible === true) {
      headerNavigation.classList.add("header__navigation--visible");
    } else {
      headerNavigation.classList.remove("header__navigation--visible");
    }
  }

  function toggleMenuIcon() {
    menuIcon.classList.toggle("header__menu-icon--close");
  }
}
