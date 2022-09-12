import _ from "lodash";
import axios from "axios";

import { autocomplete } from "@algolia/autocomplete-js";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import { handleMobileMenu, searchClient } from "./utils";

window._ = _;

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/** Mobile menu */
handleMobileMenu(".mobile-menu");

/** Autocomplete */
const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "RECENT_SEARCHES",
  limit: 5,
  transformSource({ source, onRemove, onTapAhead }) {
    return {
      ...source,
      getItemUrl({ item }) {
        return `/search?query=${item.label}`;
      },
      templates: {
        ...source.templates,
        item({ item, html, components }) {
          return html`
            <a
              href="/search?query=${item.label}"
              class="flex items-stretch justify-between hover:bg-gray-100 aria-selected:bg-gray-100 transition-colors"
            >
              <div class="flex items-center">
                <div
                  class="text-gray-400 py-3 lg:py-2.5 pl-5 lg:pl-3 pr-3 lg:pr-2 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 stroke-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span
                  >${components.ReverseHighlight({
                    hit: item,
                    attribute: "label",
                  })}</span
                >
              </div>
              <div class="flex mr-1.5">
                <button
                  class="flex-none text-gray-400/80 transition-colors hover:text-gray-600/80 p-1.5 flex items-center justify-center"
                  title="Remove this search"
                  onClick=${(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onRemove(item.label);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 stroke-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
                <button
                  class="flex-none text-gray-400/80 transition-colors hover:text-gray-600/80 p-1.5 flex items-center justify-center"
                  title="${`Fill query with "${item.label}"`}"
                  onClick=${(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onTapAhead(item);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 stroke-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
                    />
                  </svg>
                </button>
              </div>
            </a>
          `;
        },
      },
    };
  },
});

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: "PROD_pwa_ecom_ui_template_products_query_suggestions",
  getSearchParams() {
    return recentSearchesPlugin.data.getAlgoliaSearchParams({
      hitsPerPage: 5,
    });
  },
  transformSource({ source, onTapAhead }) {
    return {
      ...source,
      getItemUrl({ item }) {
        return `/search?query=${item.query}`;
      },
      templates: {
        ...source.templates,
        item({ item, html, components }) {
          return html`
            <a
              href="/search?query=${item.query}"
              class="flex items-stretch justify-between hover:bg-gray-100 aria-selected:bg-gray-100 transition-colors"
            >
              <div class="flex items-center">
                <div
                  class="text-gray-400 py-3 lg:py-2.5 pl-5 lg:pl-3 pr-3 lg:pr-2 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 stroke-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <span
                  >${components.ReverseHighlight({
                    hit: item,
                    attribute: "query",
                  })}</span
                >
              </div>
              <div class="flex mr-1.5">
                <button
                  class="flex-none text-gray-400/80 transition-colors hover:text-gray-600/80 p-1.5 flex items-center justify-center"
                  title="${`Fill query with "${item.query}"`}"
                  onClick=${(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    onTapAhead(item);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 stroke-2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25"
                    />
                  </svg>
                </button>
              </div>
            </a>
          `;
        },
      },
    };
  },
});

const searchParameters = new URLSearchParams(location.search);
autocomplete({
  container: "#autocomplete",
  openOnFocus: true,
  initialState: {
    query: searchParameters.get("query") || "",
  },
  placeholder: "Search for products",
  detachedMediaQuery: "(max-width: 1024px)",
  plugins: [recentSearchesPlugin, querySuggestionsPlugin],
  onSubmit({ state }) {
    location.href = `/search?query=${state.query}`;
  },
  classNames: {
    form: "relative rounded-md shadow-sm flex-1",
    inputWrapperPrefix: "absolute inset-y-0 left-0 flex items-center pl-3",
    inputWrapperSuffix: "absolute inset-y-0 right-0 flex items-center pr-2",
    label: "flex items-center",
    submitButton: "h-5 w-5 text-gray-400",
    clearButton: "h-5 w-5 text-gray-400",
    input:
      "block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm",
    panel:
      "flex-1 lg:flex-none lg:absolute lg:mt-2 lg:py-1 z-10 lg:ring-1 lg:ring-black lg:ring-opacity-5 lg:text-sm text-gray-500 bg-white lg:shadow-lg lg:rounded-md overflow-y-scroll lg:max-h-96",
    detachedSearchButton: "p-2 text-gray-400 hover:text-gray-500",
    detachedSearchButtonPlaceholder: "sr-only",
    detachedSearchButtonIcon: "w-6 h-6 flex items-center justify-center",
    detachedContainer:
      "fixed inset-0 flex flex-col divide-y divide-gray-200/50",
    detachedFormContainer: "flex p-2 bg-white",
    detachedCancelButton:
      "bg-white px-2 ml-2 text-gray-500 hover:text-gray-600 transition-colors",
  },
});
