import "./bootstrap";

import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import {
    configure,
    hits,
    menu,
    pagination,
    searchBox,
} from "instantsearch.js/es/widgets";
import { highlight, snippet } from "instantsearch.js/es/helpers";

import "instantsearch.css/themes/satellite.css";
import "../css/app.css";

const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
);

const search = instantsearch({
    searchClient,
    indexName: "instant_search",
    routing: {
        stateMapping: {
            routeToState(route) {
                return {
                    instant_search: {
                        query: route.q,
                        page: route.page,
                        menu: {
                            brand: route.brand || "",
                        },
                    },
                };
            },
            stateToRoute(state) {
                return {
                    q: state.instant_search.query,
                    brand: state.instant_search.menu?.brand,
                    page: state.instant_search.page,
                };
            },
        },
    },
});

search.addWidgets([
    configure({
        hitsPerPage: 8,
        attributesToSnippet: ["description:40"],
        snippetEllipsisText: "…",
    }),
    menu({
        container: ".brands",
        attribute: "brand",
    }),
    searchBox({
        container: ".searchbox",
        placeholder: "Search products…",
    }),
    hits({
        container: ".hits",
        templates: {
            item(hit) {
                return `<div class="hit">
                    <strong>${highlight({
                        attribute: "name",
                        hit,
                    })}</strong><br/>
                    ${snippet({ attribute: "description", hit })}
                </div>`;
            },
        },
    }),
    pagination({
        container: ".pagination",
    }),
]);

search.start();
