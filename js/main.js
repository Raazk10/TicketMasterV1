import Header from "../js/modules/header.js";
import handleSearchEvent from "../js/modules/handleSearchEvent.js";
import getEventDetails from "./modules/getEventDetails.js";
import eventInformation from "./modules/eventInformation.js";
eventInformation();
Header();

getEventDetails();
handleSearchEvent();
