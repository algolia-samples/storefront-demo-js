import _ from "lodash";
import axios from "axios";

import { autocomplete } from "@algolia/autocomplete-js";
import { createLocalStorageRecentSearchesPlugin } from "@algolia/autocomplete-plugin-recent-searches";
import { createQuerySuggestionsPlugin } from "@algolia/autocomplete-plugin-query-suggestions";

import { handleMobileMenu, searchClient } from "./utils";
import { PRODUCTS_QUERY_SUGGESTIONS_INDEX } from "./utils/constants";

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
