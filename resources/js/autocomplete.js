import algoliasearch from "algoliasearch/lite";
import { autocomplete } from "@algolia/autocomplete-js";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

import "../css/autocomplete.css";

function navigate(query) {
  location.href = `/search?query=${query}`;
}

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: "RECENT_SEARCHES",
  limit: 5,
  transformSource({ source }) {
    return {
      ...source,
      onSelect({ item }) {
        navigate(item.label);
      },
    };
  },
});

const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: "instant_search_demo_query_suggestions",
  getSearchParams() {
    return recentSearchesPlugin.data.getAlgoliaSearchParams({
      hitsPerPage: 5,
    });
  },
  transformSource({ source }) {
    return {
      ...source,
      onSelect({ item }) {
        navigate(item.query);
      },
    };
  },
});

export function createAutocomplete(container) {
  const searchParameters = new URLSearchParams(location.search);
  autocomplete({
    container,
    openOnFocus: true,
    initialState: {
      query: searchParameters.get("query") || "",
    },
    placeholder: "Search for products",
    detachedMediaQuery: "(max-width: 1024px)",
    plugins: [recentSearchesPlugin, querySuggestionsPlugin],
    onSubmit({ state }) {
      navigate(state.query);
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
}
