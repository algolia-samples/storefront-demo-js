import instantsearch from "instantsearch.js";
import { singleIndex } from "instantsearch.js/es/lib/stateMappings";
import { connectCurrentRefinements } from "instantsearch.js/es/connectors";
import {
  clearRefinements,
  configure,
  currentRefinements,
  hierarchicalMenu,
  infiniteHits,
  rangeInput,
  refinementList,
  searchBox,
  sortBy,
} from "instantsearch.js/es/widgets";

import { formatPrice, handleMobileMenu, searchClient } from "./utils";
import {
  PRODUCTS_INDEX,
  PRODUCTS_PRICE_ASC_INDEX,
  PRODUCTS_PRICE_DESC_INDEX,
} from "./utils/constants";

/** Mobile filters menu */
handleMobileMenu(".mobile-filters-menu");

[...document.querySelectorAll(".mobile-filters-menu [aria-controls]")].forEach(
  (button) => {
    const controls = button.getAttribute("aria-controls");
    const target = document.querySelector(`#${controls}`);
    const chevron = button.querySelector("svg");

    target.classList.add("hidden");
    button.addEventListener("click", () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      chevron.classList.toggle("rotate-0", expanded);
      chevron.classList.toggle("-rotate-180", !expanded);
      target.classList.toggle("hidden", expanded);
      button.setAttribute("aria-expanded", !expanded);
    });
  }
);
