import { trendingItems } from "@algolia/recommend-js";
import { horizontalSlider } from "@algolia/ui-components-horizontal-slider-js";

import { formatPrice, recommendClient } from "./utils";
import { PRODUCTS_INDEX } from "./utils/constants";

import "@algolia/ui-components-horizontal-slider-theme";

/** Trending products */
trendingItems({
  container: "#trending-products",
  recommendClient,
  indexName: PRODUCTS_INDEX,
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
          href="/search"
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
      <div class="flex justify-center h-32">
        <img
          src="${item.image1}"
          alt="${item.title}"
          class="w-full h-full object-center object-contain"
        />
      </div>
      <h3 class="mt-4 text-sm text-gray-700 line-clamp-3">
        <a href="${item.link_grade_v2.href}">
          <span class="absolute inset-0" />
          ${item.title}
        </a>
      </h3>
      <p class="mt-2 text-sm text-gray-500">${item.brand_label}</p>
      <p class="mt-2 text-sm font-medium text-gray-900">
        ${formatPrice(item.price, item.currency)}
      </p>
    </div>`;
  },
});
