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

const FILTER_LABEL_MAP = {
  "categories.lvl0": "Categories",
  brand_label: "Brand",
  color: "Color",
  price_new: "Price",
};

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

/** InstantSearch */
const search = instantsearch({
  searchClient,
  indexName: PRODUCTS_INDEX,
  routing: {
    stateMapping: singleIndex(PRODUCTS_INDEX),
  },
});

const noFiltersLabel = connectCurrentRefinements(
  ({ canRefine, widgetParams }) => {
    const { container } = widgetParams;

    const containerNode = document.querySelector(container);
    containerNode.innerHTML = !canRefine
      ? `<p class="text-sm mx-7 mb-4 sm:mb-0 font-normal text-gray-400">No active filters</p>`
      : "";
  }
);

function getFilters(type) {
  return [
    // Hierarchical menu
    hierarchicalMenu({
      container: `#filter-${type}-categorieslvl0`,
      attributes: ["categories.lvl0", "categories.lvl1"],
      cssClasses: {
        root: "pt-6 -ml-4",
        list: "ml-4 block space-y-4 lg:space-y-3",
        item: "space-y-4 lg:space-y-3",
        link: "block text-sm text-gray-600",
        count:
          "ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700",
      },
    }),
    // Refinement lists
    ...["brand_label", "color"].map((attribute) =>
      refinementList({
        container: `#filter-${type}-${attribute.replace(".", "")}`,
        attribute,
        limit: 8,
        transformItems(items) {
          if (attribute !== "color.original_name") {
            return items;
          }

          return items.map((item) => {
            const capitalized =
              item.label.slice(0, 1).toLocaleUpperCase() + item.label.slice(1);
            return {
              ...item,
              label: capitalized,
              highlighted: capitalized,
            };
          });
        },
        cssClasses: {
          list: "pt-6 space-y-4 lg:space-y-3",
          item: "flex items-center",
          selectedItem: "font-semibold",
          label: "cursor-pointer",
          checkbox:
            "h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500",
          labelText: "ml-3 text-sm text-gray-600",
          count:
            "ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700",
        },
      })
    ),
    // Range input
    rangeInput({
      container: `#filter-${type}-price_new`,
      attribute: "price_new",
      cssClasses: {
        form: "pt-6 flex space-x-4 justify-between",
        input:
          "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
        separator: "self-center text-sm font-medium text-gray-500",
        submit:
          "rounded-md bg-gray-200 px-4 text-sm font-medium text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50",
      },
    }),
  ];
}

search.addWidgets([
  configure({ hitsPerPage: 9 }),
  searchBox({
    container: document.createDocumentFragment(),
  }),
  // Current refinements
  noFiltersLabel({
    container: "#no-filters-label",
  }),
  currentRefinements({
    container: "#current-refinements",
    transformItems(items) {
      return items.map((item) => ({
        ...item,
        label: FILTER_LABEL_MAP[item.label] || item.label,
      }));
    },
    cssClasses: {
      root: 'relative before:content-[""] before:absolute before:w-6 before:h-full before:bg-gradient-to-r before:from-gray-100 after:content-[""] after:absolute after:w-6 after:h-full after:top-0 after:right-0 after:bg-gradient-to-l after:from-gray-100',
      list: "flex space-x-4 px-6 pb-4 sm:py-4 overflow-auto",
      item: "flex flex-shrink-0 rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900",
      categoryLabel: "ml-2 font-normal text-gray-700",
      delete:
        "ml-1 inline-flex items-center w-4 h-4 flex-shrink-0 rounded-full p-1 hover:!bg-gray-200 text-xs text-gray-400 hover:text-gray-500",
    },
  }),
  // Clear refinements
  clearRefinements({
    container: "#clear-refinements",
    templates: {
      resetLabel: (_, { html }) => html`Clear all`,
    },
    cssClasses: {
      root: "sm:px-3",
      button:
        "block text-sm text-gray-500 hover:text-gray-800 px-7 py-3 sm:px-6 sm:py-0 sm:border-r sm:border-gray-300",
      disabledButton: "hidden",
    },
  }),
  // Sort by
  sortBy({
    container: "#sortby",
    items: [
      {
        label: "Sort by relevance",
        value: PRODUCTS_INDEX,
      },
      {
        label: "Sort by price (low to high)",
        value: PRODUCTS_PRICE_ASC_INDEX,
      },
      {
        label: "Sort by price (high to low)",
        value: PRODUCTS_PRICE_DESC_INDEX,
      },
    ],
    cssClasses: {
      select:
        "w-full m-0 pl-4 pr-8 py-2 rounded-md border-0 bg-transparent cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500",
    },
  }),
  ...getFilters("desktop"),
  ...getFilters("mobile"),
  infiniteHits({
    container: "#products",
    showPrevious: true,
    templates: {
      empty({ query }, { html }) {
        return html`<div class="text-center space-y-2">
          <p class="font-medium text-lg">
            We didn't find a match for « ${query} »
          </p>
          <p class="text-sm text-gray-500">
            Try searching for something else instead
          </p>
        </div>`;
      },
      item(hit, { html, components }) {
        return html`<a href="${hit.link_grade_v2.href}" class="group">
          <div
            class="sm:relative aspect-square bg-white group-hover:opacity-75 sm:aspect-none p-6"
          >
            <img
              src=${hit.image1}
              alt=${hit.title}
              class="w-full h-full object-center object-cover sm:w-full sm:h-full"
            />
          </div>
          <div class="flex-1 p-4 space-y-2 flex flex-col">
            <h3 class="mt-4 text-sm text-gray-700 line-clamp-3">
              ${components.Highlight({ hit, attribute: "title" })}
            </h3>
            <p class="mt-2 text-sm text-gray-500">${hit.brand_label}</p>
            <p class="mt-2 text-sm font-medium text-gray-900">
              ${formatPrice(hit.price, hit.currency)}
            </p>
          </div>
        </a>`;
      },
    },
    cssClasses: {
      list: "grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3",
      item: "relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden",
      loadPrevious:
        "mb-10 h-10 w-full items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600",
      disabledLoadPrevious: "hidden",
      loadMore:
        "mt-10 h-10 w-full items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600",
      disabledLoadMore: "hidden",
    },
  }),
]);

search.start();
