import Header from "./modules/header.js";
import fetchApi from "./modules/fetchApi.js";
import RenderEvent from "./modules/renderEvent.js";
import SearchEvent from "./modules/search.js";

Header();
const event = await fetchApi();
RenderEvent(event);
SearchEvent(event);
