import "./bootstrap";

import algoliasearch from "algoliasearch";
import instantsearch from "instantsearch.js";
import {
    hits,
    pagination,
    refinementList,
    searchBox,
} from "instantsearch.js/es/widgets";

import "instantsearch.css/themes/satellite.css";
import "../css/app.css";

const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
);

const search = instantsearch({
    searchClient,
    indexName: "instant_search",
});

search.addWidgets([
    refinementList({
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
            item: `<div class="hit">
                <strong>{{#helpers.highlight}}{ "attribute": "name" }{{/helpers.highlight}}</strong><br/>
                {{description}}
            </div>`,
        },
    }),
    pagination({
        container: ".pagination",
    }),
]);

search.start();
