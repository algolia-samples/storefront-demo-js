import recommend from "@algolia/recommend";
import { trendingItems } from "@algolia/recommend-js";
import { horizontalSlider } from "@algolia/ui-components-horizontal-slider-js";

import "@algolia/ui-components-horizontal-slider-theme";

/** Trending products */
const recommendClient = recommend(
  "XX85YRZZMV",
  "098f71f9e2267178bdfc08cc986d2999"
);

trendingItems({
  container: "#trending-products",
  recommendClient,
  indexName: "test_FLAGSHIP_ECOM_recommend",
  maxRecommendations: 10,
  headerComponent() {
    return null;
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
