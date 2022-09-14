import { trendingItems } from "@algolia/recommend-js";
import { horizontalSlider } from "@algolia/ui-components-horizontal-slider-js";

import { recommendClient } from "./utils";

import "@algolia/ui-components-horizontal-slider-theme";

/** Trending products */
trendingItems({
  container: "#trending-products",
  recommendClient,
  indexName: "test_FLAGSHIP_ECOM_recommend",
  maxRecommendations: 10,
  headerComponent({ html }) {
    return html`
      <div class="flex items-center justify-between mb-4">
        <h2
          id="trending-heading"
          class="text-2xl font-bold tracking-tight text-gray-900"
        >
          Trending Products
        </h2>
        <a
          href="{{ url('/search') }}"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Browse now
          <span aria-hidden="true"> →</span>
        </a>
      </div>
    `;
  },
  view: horizontalSlider,
  itemComponent({ item, html }) {
    return html`<div class="group relative">
      <div>
        ${item.image_urls?.length > 0 &&
        html`<img
          src="${item.image_urls[0]}"
          alt="${item.name}"
          class="w-full h-full object-center object-cover"
        />`}
      </div>
      <h3 class="mt-4 text-sm text-gray-700 truncate">
        <a href="${item.url}">
          <span class="absolute inset-0" />
          ${item.name}
        </a>
      </h3>
      <p class="mt-1 text-sm text-gray-500">${item.brand}</p>
      <p class="mt-1 text-sm font-medium text-gray-900">
        ${item.price.currency} ${item.price.value}
      </p>
    </div>`;
  },
});
